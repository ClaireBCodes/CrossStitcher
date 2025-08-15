import { describe, it, expect } from 'vitest';
import {
  createBlankGrid,
  clearGrid,
  resizeGrid,
  countFilledCells,
  getGridDimensions,
  isValidPosition,
} from '../gridUtils';

describe('gridUtils', () => {
  describe('createBlankGrid', () => {
    it('should create a grid with specified dimensions', () => {
      const grid = createBlankGrid(3, 2);
      expect(grid).toHaveLength(2);
      expect(grid[0]).toHaveLength(3);
      expect(grid[0][0]).toBeNull();
    });

    it('should handle zero dimensions', () => {
      const grid = createBlankGrid(0, 0);
      expect(grid).toHaveLength(0);
    });
  });

  describe('clearGrid', () => {
    it('should clear all cells while preserving dimensions', () => {
      const originalGrid = [
        [{ hex: 'ff0000' }, { hex: '00ff00' }],
        [{ hex: '0000ff' }, null],
      ];
      const cleared = clearGrid(originalGrid);

      expect(cleared).toHaveLength(2);
      expect(cleared[0]).toHaveLength(2);
      expect(cleared[0][0]).toBeNull();
      expect(cleared[1][1]).toBeNull();
    });

    it('should handle empty grid', () => {
      const cleared = clearGrid([]);
      expect(cleared).toHaveLength(0);
    });
  });

  describe('resizeGrid', () => {
    it('should expand grid and preserve content', () => {
      const original = [[{ hex: 'ff0000' }, { hex: '00ff00' }]];
      const resized = resizeGrid(original, 3, 2);

      expect(resized).toHaveLength(2);
      expect(resized[0]).toHaveLength(3);
      expect(resized[0][0]).toEqual({ hex: 'ff0000' });
      expect(resized[0][2]).toBeNull();
      expect(resized[1][0]).toBeNull();
    });

    it('should shrink grid and crop content', () => {
      const original = [
        [{ hex: 'ff0000' }, { hex: '00ff00' }, { hex: '0000ff' }],
        [{ hex: 'ffff00' }, { hex: 'ff00ff' }, { hex: '00ffff' }],
      ];
      const resized = resizeGrid(original, 2, 1);

      expect(resized).toHaveLength(1);
      expect(resized[0]).toHaveLength(2);
      expect(resized[0][0]).toEqual({ hex: 'ff0000' });
      expect(resized[0][1]).toEqual({ hex: '00ff00' });
    });

    it('should handle empty grid', () => {
      const resized = resizeGrid([], 2, 2);
      expect(resized).toHaveLength(2);
      expect(resized[0]).toHaveLength(2);
      expect(resized[0][0]).toBeNull();
    });
  });

  describe('countFilledCells', () => {
    it('should count non-null cells', () => {
      const grid = [
        [{ hex: 'ff0000' }, null, { hex: '00ff00' }],
        [null, { hex: '0000ff' }, null],
      ];
      expect(countFilledCells(grid)).toBe(3);
    });

    it('should return 0 for empty grid', () => {
      expect(countFilledCells([])).toBe(0);
    });

    it('should return 0 for grid with all null cells', () => {
      const grid = [
        [null, null],
        [null, null],
      ];
      expect(countFilledCells(grid)).toBe(0);
    });
  });

  describe('getGridDimensions', () => {
    it('should return correct dimensions', () => {
      const grid = [
        [null, null, null],
        [null, null, null],
      ];
      expect(getGridDimensions(grid)).toEqual({ width: 3, height: 2 });
    });

    it('should handle empty grid', () => {
      expect(getGridDimensions([])).toEqual({ width: 0, height: 0 });
    });

    it('should handle grid with empty rows', () => {
      const grid = [[], []];
      expect(getGridDimensions(grid)).toEqual({ width: 0, height: 2 });
    });
  });

  describe('isValidPosition', () => {
    const grid = [
      [null, null, null],
      [null, null, null],
    ];

    it('should return true for valid positions', () => {
      expect(isValidPosition(grid, 0, 0)).toBe(true);
      expect(isValidPosition(grid, 1, 2)).toBe(true);
    });

    it('should return false for negative indices', () => {
      expect(isValidPosition(grid, -1, 0)).toBe(false);
      expect(isValidPosition(grid, 0, -1)).toBe(false);
    });

    it('should return false for out of bounds indices', () => {
      expect(isValidPosition(grid, 2, 0)).toBe(false);
      expect(isValidPosition(grid, 0, 3)).toBe(false);
    });

    it('should handle empty grid', () => {
      expect(isValidPosition([], 0, 0)).toBe(false);
    });
  });
});
