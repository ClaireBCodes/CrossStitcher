import { describe, it, expect, beforeEach, vi } from 'vitest';
import ImageProcessor from '../imageProcessor';
import dmcColors from '../../assets/dmc.json';

// Mock canvas API
const mockGetContext = vi.fn();
const mockDrawImage = vi.fn();
const mockGetImageData = vi.fn();

HTMLCanvasElement.prototype.getContext = mockGetContext;

describe('ImageProcessor', () => {
  let processor;
  let mockContext;
  
  beforeEach(() => {
    processor = new ImageProcessor(10);
    
    // Setup canvas mock
    mockContext = {
      drawImage: mockDrawImage,
      getImageData: mockGetImageData
    };
    mockGetContext.mockReturnValue(mockContext);
    
    // Reset all mocks
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with default max colors', () => {
      const defaultProcessor = new ImageProcessor();
      expect(defaultProcessor.maxColors).toBe(20);
    });

    it('should initialize with custom max colors', () => {
      expect(processor.maxColors).toBe(10);
    });

    it('should have DMC colors loaded', () => {
      expect(processor.dmcColors).toBe(dmcColors);
      expect(processor.dmcColors.length).toBeGreaterThan(0);
    });
  });

  describe('colorDistance', () => {
    it('should calculate correct distance between identical colors', () => {
      const color = { r: 100, g: 100, b: 100 };
      const distance = processor.colorDistance(color, color);
      expect(distance).toBe(0);
    });

    it('should calculate weighted Euclidean distance', () => {
      const c1 = { r: 0, g: 0, b: 0 };
      const c2 = { r: 100, g: 100, b: 100 };
      const distance = processor.colorDistance(c1, c2);
      
      // Weighted: sqrt(2*100^2 + 4*100^2 + 1*100^2) = sqrt(70000) ≈ 264.58
      expect(distance).toBeCloseTo(264.58, 1);
    });
  });

  describe('findClosestDMC', () => {
    it('should find exact match when available', () => {
      const firstColor = dmcColors[0];
      const result = processor.findClosestDMC(
        firstColor.red,
        firstColor.green,
        firstColor.blue
      );
      
      expect(result.floss).toBe(firstColor.floss);
    });

    it('should find closest color when no exact match', () => {
      const result = processor.findClosestDMC(128, 128, 128);
      expect(result).toBeDefined();
      expect(result.floss).toBeDefined();
      expect(result.hex).toBeDefined();
    });

    it('should limit search to provided palette', () => {
      const limitedPalette = dmcColors.slice(0, 5);
      const result = processor.findClosestDMC(200, 100, 50, limitedPalette);
      
      expect(limitedPalette).toContain(result);
    });
  });

  describe('extractColors', () => {
    it('should extract unique colors from pixel data', () => {
      const pixels = new Uint8ClampedArray([
        255, 0, 0, 255,   // Red pixel
        255, 0, 0, 255,   // Red pixel (duplicate)
        0, 255, 0, 255,   // Green pixel
        0, 0, 255, 128,   // Blue pixel (semi-transparent)
        0, 0, 0, 0        // Transparent pixel (ignored)
      ]);
      
      const colorMap = processor.extractColors(pixels, 5, 1);
      
      expect(colorMap.size).toBe(3); // Red, Green, Blue (transparent ignored)
      expect(colorMap.get('255,0,0')).toBe(2); // Red appears twice
      expect(colorMap.get('0,255,0')).toBe(1); // Green appears once
      expect(colorMap.get('0,0,255')).toBe(1); // Blue appears once
    });

    it('should ignore fully transparent pixels', () => {
      const pixels = new Uint8ClampedArray([
        255, 0, 0, 0,     // Transparent red
        0, 255, 0, 127,   // Almost transparent green
        0, 0, 255, 128,   // Semi-transparent blue (included)
      ]);
      
      const colorMap = processor.extractColors(pixels, 3, 1);
      
      expect(colorMap.size).toBe(1); // Only blue is included
      expect(colorMap.has('0,0,255')).toBe(true);
    });
  });

  describe('kMeansClustering', () => {
    it('should return original colors if k >= color count', () => {
      const colors = [
        { r: 255, g: 0, b: 0 },
        { r: 0, g: 255, b: 0 }
      ];
      
      const result = processor.kMeansClustering(colors, 3);
      expect(result).toEqual(colors);
    });

    it('should reduce colors to k clusters', () => {
      const colors = [
        { r: 255, g: 0, b: 0 },
        { r: 200, g: 0, b: 0 },
        { r: 0, g: 255, b: 0 },
        { r: 0, g: 200, b: 0 },
        { r: 0, g: 0, b: 255 }
      ];
      
      const result = processor.kMeansClustering(colors, 3);
      expect(result.length).toBe(3);
      
      // Each result should be a valid RGB color
      result.forEach(color => {
        expect(color).toHaveProperty('r');
        expect(color).toHaveProperty('g');
        expect(color).toHaveProperty('b');
        expect(color.r).toBeGreaterThanOrEqual(0);
        expect(color.r).toBeLessThanOrEqual(255);
      });
    });
  });

  describe('reduceColors', () => {
    it('should reduce colors and map to DMC', () => {
      const colorMap = new Map([
        ['255,0,0', 10],
        ['0,255,0', 8],
        ['0,0,255', 5],
        ['255,255,0', 3],
        ['255,0,255', 2]
      ]);
      
      processor.maxColors = 3;
      const result = processor.reduceColors(colorMap);
      
      expect(result.length).toBeLessThanOrEqual(3);
      result.forEach(color => {
        expect(color).toHaveProperty('floss');
        expect(color).toHaveProperty('hex');
        expect(dmcColors).toContain(color);
      });
    });
  });

  describe('imageToPattern', () => {
    it('should convert image data to pattern grid', () => {
      const mockImage = {
        width: 100,
        height: 100
      };
      
      // Mock 2x2 grid with RGBA values
      const imageData = {
        data: new Uint8ClampedArray([
          255, 0, 0, 255,    // Red
          0, 255, 0, 255,    // Green
          0, 0, 255, 255,    // Blue
          255, 255, 0, 255   // Yellow
        ])
      };
      
      mockGetImageData.mockReturnValue(imageData);
      
      const result = processor.imageToPattern(mockImage, 2, 2);
      
      expect(result).toHaveProperty('grid');
      expect(result).toHaveProperty('palette');
      expect(result.grid.length).toBe(2);
      expect(result.grid[0].length).toBe(2);
      
      // Each cell should be null or a DMC color
      result.grid.forEach(row => {
        row.forEach(cell => {
          if (cell !== null) {
            expect(cell).toHaveProperty('floss');
            expect(cell).toHaveProperty('hex');
          }
        });
      });
    });

    it('should handle transparent pixels', () => {
      const mockImage = { width: 100, height: 100 };
      
      const imageData = {
        data: new Uint8ClampedArray([
          255, 0, 0, 255,    // Red (opaque)
          0, 255, 0, 0,      // Green (transparent)
          0, 0, 255, 127,    // Blue (semi-transparent)
          255, 255, 0, 255   // Yellow (opaque)
        ])
      };
      
      mockGetImageData.mockReturnValue(imageData);
      
      const result = processor.imageToPattern(mockImage, 2, 2);
      
      expect(result.grid[0][0]).not.toBeNull(); // Red
      expect(result.grid[0][1]).toBeNull();     // Green (transparent)
      expect(result.grid[1][0]).toBeNull();     // Blue (semi-transparent)
      expect(result.grid[1][1]).not.toBeNull(); // Yellow
    });
  });

  describe('processImage', () => {
    it('should process image file and return pattern', async () => {
      const mockFile = new Blob(['fake image data'], { type: 'image/png' });
      
      // Mock FileReader
      const mockReader = {
        readAsDataURL: vi.fn(),
        onload: null,
        onerror: null,
        result: 'data:image/png;base64,fake'
      };
      
      globalThis.FileReader = vi.fn(() => mockReader);
      
      // Mock Image
      const mockImage = {
        onload: null,
        onerror: null,
        src: null,
        width: 100,
        height: 100
      };
      
      globalThis.Image = vi.fn(() => mockImage);
      
      // Mock image data
      const imageData = {
        data: new Uint8ClampedArray(4 * 10 * 10).fill(255)
      };
      mockGetImageData.mockReturnValue(imageData);
      
      // Start processing
      const processPromise = processor.processImage(mockFile, 10, 10);
      
      // Trigger FileReader load
      mockReader.readAsDataURL(mockFile);
      mockReader.onload({ target: { result: mockReader.result } });
      
      // Trigger Image load
      mockImage.onload();
      
      const result = await processPromise;
      
      expect(result).toHaveProperty('grid');
      expect(result).toHaveProperty('palette');
      expect(result.grid.length).toBe(10);
      expect(result.grid[0].length).toBe(10);
    });

    it('should reject on file read error', async () => {
      const mockFile = new Blob(['fake image data'], { type: 'image/png' });
      
      const mockReader = {
        readAsDataURL: vi.fn(),
        onload: null,
        onerror: null
      };
      
      globalThis.FileReader = vi.fn(() => mockReader);
      
      const processPromise = processor.processImage(mockFile, 10, 10);
      
      mockReader.readAsDataURL(mockFile);
      mockReader.onerror();
      
      await expect(processPromise).rejects.toThrow('Failed to read file');
    });

    it('should reject on image load error', async () => {
      const mockFile = new Blob(['fake image data'], { type: 'image/png' });
      
      const mockReader = {
        readAsDataURL: vi.fn(),
        onload: null,
        onerror: null,
        result: 'data:image/png;base64,fake'
      };
      
      globalThis.FileReader = vi.fn(() => mockReader);
      
      const mockImage = {
        onload: null,
        onerror: null,
        src: null
      };
      
      globalThis.Image = vi.fn(() => mockImage);
      
      const processPromise = processor.processImage(mockFile, 10, 10);
      
      mockReader.readAsDataURL(mockFile);
      mockReader.onload({ target: { result: mockReader.result } });
      mockImage.onerror();
      
      await expect(processPromise).rejects.toThrow('Failed to load image');
    });
  });
});