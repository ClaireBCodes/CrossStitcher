import dmcColors from '../assets/dmc.json';

/**
 * Converts an image to a cross-stitch pattern
 */
export class ImageProcessor {
  constructor(maxColors = 20) {
    this.maxColors = maxColors;
    this.dmcColors = dmcColors;
  }

  /**
   * Process an image file and convert to pattern
   */
  async processImage(file, gridWidth, gridHeight) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        
        img.onload = () => {
          try {
            const pattern = this.imageToPattern(img, gridWidth, gridHeight);
            resolve(pattern);
          } catch (error) {
            reject(error);
          }
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target.result;
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Convert image to pattern grid
   */
  imageToPattern(img, gridWidth, gridHeight) {
    // Create canvas for image processing
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = gridWidth;
    canvas.height = gridHeight;
    
    // Draw and resize image
    ctx.drawImage(img, 0, 0, gridWidth, gridHeight);
    
    // Get pixel data
    const imageData = ctx.getImageData(0, 0, gridWidth, gridHeight);
    const pixels = imageData.data;
    
    // Build color palette from image
    const colorMap = this.extractColors(pixels);
    const palette = this.reduceColors(colorMap);
    
    // Create pattern grid
    const grid = [];
    for (let y = 0; y < gridHeight; y++) {
      const row = [];
      for (let x = 0; x < gridWidth; x++) {
        const idx = (y * gridWidth + x) * 4;
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        const a = pixels[idx + 3];
        
        if (a < 128) {
          // Transparent pixel
          row.push(null);
        } else {
          // Find closest DMC color
          const dmcColor = this.findClosestDMC(r, g, b, palette);
          row.push(dmcColor);
        }
      }
      grid.push(row);
    }
    
    return { grid, palette };
  }

  /**
   * Extract unique colors from pixel data
   */
  extractColors(pixels) {
    const colorMap = new Map();
    
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];
      
      if (a >= 128) { // Ignore transparent pixels
        const key = `${r},${g},${b}`;
        colorMap.set(key, (colorMap.get(key) || 0) + 1);
      }
    }
    
    return colorMap;
  }

  /**
   * Reduce colors to a manageable palette using k-means clustering
   */
  reduceColors(colorMap) {
    const colors = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1]) // Sort by frequency
      .slice(0, this.maxColors * 3) // Take top colors
      .map(([key]) => {
        const [r, g, b] = key.split(',').map(Number);
        return { r, g, b };
      });
    
    // Simple k-means clustering
    const clusters = this.kMeansClustering(colors, Math.min(this.maxColors, colors.length));
    
    // Map clusters to DMC colors
    const dmcPalette = [];
    const usedColors = new Set();
    
    clusters.forEach(cluster => {
      const dmcColor = this.findClosestDMC(cluster.r, cluster.g, cluster.b);
      // Avoid duplicate DMC colors in palette
      if (dmcColor && !usedColors.has(dmcColor.floss)) {
        usedColors.add(dmcColor.floss);
        dmcPalette.push(dmcColor);
      }
    });
    
    return dmcPalette;
  }

  /**
   * Simple k-means clustering for color reduction
   */
  kMeansClustering(colors, k) {
    if (colors.length <= k) return colors;
    
    // Initialize centroids randomly
    const centroids = [];
    const used = new Set();
    
    while (centroids.length < k) {
      const idx = Math.floor(Math.random() * colors.length);
      if (!used.has(idx)) {
        used.add(idx);
        centroids.push({ ...colors[idx] });
      }
    }
    
    // Iterate to converge
    for (let iteration = 0; iteration < 10; iteration++) {
      // Assign colors to nearest centroid
      const clusters = Array(k).fill(null).map(() => []);
      
      colors.forEach(color => {
        let minDist = Infinity;
        let bestCluster = 0;
        
        centroids.forEach((centroid, idx) => {
          const dist = this.colorDistance(color, centroid);
          if (dist < minDist) {
            minDist = dist;
            bestCluster = idx;
          }
        });
        
        clusters[bestCluster].push(color);
      });
      
      // Update centroids
      clusters.forEach((cluster, idx) => {
        if (cluster.length > 0) {
          const avg = cluster.reduce((acc, color) => ({
            r: acc.r + color.r,
            g: acc.g + color.g,
            b: acc.b + color.b
          }), { r: 0, g: 0, b: 0 });
          
          centroids[idx] = {
            r: Math.round(avg.r / cluster.length),
            g: Math.round(avg.g / cluster.length),
            b: Math.round(avg.b / cluster.length)
          };
        }
      });
    }
    
    return centroids;
  }

  /**
   * Find closest DMC color to RGB values
   */
  findClosestDMC(r, g, b, limitToPalette = null) {
    const searchColors = limitToPalette || this.dmcColors;
    let minDistance = Infinity;
    let closestColor = null;
    
    searchColors.forEach(dmc => {
      // Handle both DMC colors and simple RGB objects
      const dmcR = dmc.red !== undefined ? dmc.red : dmc.r;
      const dmcG = dmc.green !== undefined ? dmc.green : dmc.g;
      const dmcB = dmc.blue !== undefined ? dmc.blue : dmc.b;
      
      if (dmcR === undefined || dmcG === undefined || dmcB === undefined) {
        return; // Skip invalid colors
      }
      
      const distance = this.colorDistance(
        { r, g, b },
        { r: dmcR, g: dmcG, b: dmcB }
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = dmc;
      }
    });
    
    return closestColor;
  }

  /**
   * Calculate color distance using weighted Euclidean distance
   * Human eye is more sensitive to green, then red, then blue
   */
  colorDistance(c1, c2) {
    const rWeight = 2;
    const gWeight = 4;
    const bWeight = 1;
    
    const dr = c1.r - c2.r;
    const dg = c1.g - c2.g;
    const db = c1.b - c2.b;
    
    return Math.sqrt(
      rWeight * dr * dr + 
      gWeight * dg * dg + 
      bWeight * db * db
    );
  }
}

export default ImageProcessor;