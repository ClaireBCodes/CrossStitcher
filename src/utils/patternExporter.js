/**
 * Utility for exporting cross-stitch patterns to various formats
 */
export class PatternExporter {
  constructor() {
    this.cellSize = 20;
    this.gridLineWidth = 1;
    this.majorGridInterval = 10;
    this.margin = 40;
    this.legendWidth = 200;
  }

  /**
   * Export pattern as PNG image
   */
  exportAsPNG(grid, filename = 'pattern.png') {
    const canvas = this.createPatternCanvas(grid);
    
    // Convert to blob and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  /**
   * Export pattern as PDF (requires additional library)
   * This is a placeholder - would need jsPDF or similar library
   */
  exportAsPDF(grid, filename = 'pattern.pdf') {
    // For now, we'll export as a high-res PNG that can be printed
    // In a full implementation, we'd use jsPDF or similar
    const canvas = this.createPatternCanvas(grid, true);
    
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename.replace('.pdf', '.png');
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png', 1.0);
  }

  /**
   * Create a canvas with the pattern rendered
   */
  createPatternCanvas(grid, highRes = false) {
    const scale = highRes ? 2 : 1;
    const cellSize = this.cellSize * scale;
    const gridLineWidth = this.gridLineWidth * scale;
    const margin = this.margin * scale;
    
    const width = grid[0].length;
    const height = grid.length;
    
    // Calculate canvas dimensions
    const patternWidth = width * cellSize;
    const patternHeight = height * cellSize;
    const canvasWidth = patternWidth + (margin * 2) + this.legendWidth * scale;
    const canvasHeight = patternHeight + (margin * 2);
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    
    // White background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw pattern grid
    this.drawPattern(ctx, grid, margin, cellSize, scale);
    
    // Draw grid lines
    this.drawGridLines(ctx, width, height, margin, cellSize, gridLineWidth);
    
    // Draw legend
    this.drawLegend(ctx, grid, patternWidth + margin + 20 * scale, margin, scale);
    
    // Draw title and info
    this.drawInfo(ctx, width, height, margin, scale);
    
    return canvas;
  }

  /**
   * Draw the pattern cells
   */
  drawPattern(ctx, grid, margin, cellSize, scale) {
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          // Fill cell with color
          ctx.fillStyle = `#${cell.hex}`;
          ctx.fillRect(
            margin + x * cellSize,
            margin + y * cellSize,
            cellSize,
            cellSize
          );
          
          // Add symbol/text for DMC code (optional)
          if (cellSize >= 15 * scale) {
            ctx.fillStyle = this.getContrastColor(cell.hex);
            ctx.font = `${8 * scale}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Use first letter of floss code as symbol
            const symbol = cell.floss ? cell.floss[0] : '●';
            ctx.fillText(
              symbol,
              margin + x * cellSize + cellSize / 2,
              margin + y * cellSize + cellSize / 2
            );
          }
        }
      });
    });
  }

  /**
   * Draw grid lines
   */
  drawGridLines(ctx, width, height, margin, cellSize, gridLineWidth) {
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = gridLineWidth;
    
    // Vertical lines
    for (let x = 0; x <= width; x++) {
      if (x % this.majorGridInterval === 0) {
        ctx.strokeStyle = '#666';
        ctx.lineWidth = gridLineWidth * 2;
      } else {
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = gridLineWidth;
      }
      
      ctx.beginPath();
      ctx.moveTo(margin + x * cellSize, margin);
      ctx.lineTo(margin + x * cellSize, margin + height * cellSize);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y++) {
      if (y % this.majorGridInterval === 0) {
        ctx.strokeStyle = '#666';
        ctx.lineWidth = gridLineWidth * 2;
      } else {
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = gridLineWidth;
      }
      
      ctx.beginPath();
      ctx.moveTo(margin, margin + y * cellSize);
      ctx.lineTo(margin + width * cellSize, margin + y * cellSize);
      ctx.stroke();
    }
  }

  /**
   * Draw color legend
   */
  drawLegend(ctx, grid, x, y, scale) {
    // Collect unique colors
    const colors = new Map();
    grid.forEach(row => {
      row.forEach(cell => {
        if (cell && !colors.has(cell.floss)) {
          colors.set(cell.floss, cell);
        }
      });
    });
    
    // Draw legend title
    ctx.fillStyle = 'black';
    ctx.font = `bold ${14 * scale}px sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('DMC Colors', x, y);
    
    // Draw color entries
    let currentY = y + 25 * scale;
    const swatchSize = 15 * scale;
    const spacing = 20 * scale;
    
    colors.forEach((color) => {
      // Color swatch
      ctx.fillStyle = `#${color.hex}`;
      ctx.fillRect(x, currentY, swatchSize, swatchSize);
      
      // Border
      ctx.strokeStyle = '#333';
      ctx.lineWidth = scale;
      ctx.strokeRect(x, currentY, swatchSize, swatchSize);
      
      // DMC code and name
      ctx.fillStyle = 'black';
      ctx.font = `${11 * scale}px sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      
      const label = `${color.floss}: ${color.name || color.description || ''}`;
      ctx.fillText(
        label,
        x + swatchSize + 5 * scale,
        currentY + swatchSize / 2
      );
      
      currentY += spacing;
    });
  }

  /**
   * Draw pattern information
   */
  drawInfo(ctx, width, height, margin, scale) {
    ctx.fillStyle = 'black';
    ctx.font = `${12 * scale}px sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    
    const date = new Date().toLocaleDateString();
    const info = `Size: ${width} × ${height} | Date: ${date}`;
    
    ctx.fillText(info, margin, margin - 10 * scale);
  }

  /**
   * Get contrasting text color for background
   */
  getContrastColor(hexColor) {
    // Convert hex to RGB
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }

  /**
   * Export pattern as JSON
   */
  exportAsJSON(grid, filename = 'pattern.json') {
    const data = {
      version: '1.0',
      created: new Date().toISOString(),
      dimensions: {
        width: grid[0]?.length || 0,
        height: grid.length
      },
      grid: grid
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Export pattern as CSV (for spreadsheet programs)
   */
  exportAsCSV(grid, filename = 'pattern.csv') {
    const rows = [];
    
    // Header row with column numbers
    const header = [''];
    for (let x = 0; x < grid[0].length; x++) {
      header.push(x + 1);
    }
    rows.push(header.join(','));
    
    // Pattern rows
    grid.forEach((row, y) => {
      const csvRow = [y + 1]; // Row number
      row.forEach(cell => {
        csvRow.push(cell ? cell.floss : '');
      });
      rows.push(csvRow.join(','));
    });
    
    // Color legend
    rows.push('');
    rows.push('DMC Colors');
    const colors = new Map();
    grid.forEach(row => {
      row.forEach(cell => {
        if (cell && !colors.has(cell.floss)) {
          colors.set(cell.floss, cell);
        }
      });
    });
    
    colors.forEach(color => {
      rows.push(`${color.floss},"${color.name || color.description || ''}",#${color.hex}`);
    });
    
    const csv = rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}

export default PatternExporter;