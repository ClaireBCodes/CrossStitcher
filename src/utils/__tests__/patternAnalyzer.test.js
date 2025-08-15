import { describe, it, expect } from 'vitest';
import { getUsedColors, assignSymbolsToColors, createColorSymbolMapping } from '../patternAnalyzer';

describe('patternAnalyzer', () => {
  describe('getUsedColors', () => {
    it('should return empty array for empty grid', () => {
      const grid = [[]];
      const result = getUsedColors(grid);
      expect(result).toEqual([]);
    });

    it('should count colors correctly', () => {
      const grid = [
        [
          { hex: 'ff0000', floss: '666', name: 'Red' },
          { hex: 'ff0000', floss: '666', name: 'Red' },
        ],
        [{ hex: '00ff00', floss: '700', name: 'Green' }, null],
      ];
      const result = getUsedColors(grid);

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        hex: 'ff0000',
        floss: '666',
        name: 'Red',
        count: 2,
      });
      expect(result[1]).toMatchObject({
        hex: '00ff00',
        floss: '700',
        name: 'Green',
        count: 1,
      });
    });

    it('should sort colors by count descending', () => {
      const grid = [
        [{ hex: '00ff00', floss: '700', name: 'Green' }],
        [
          { hex: 'ff0000', floss: '666', name: 'Red' },
          { hex: 'ff0000', floss: '666', name: 'Red' },
        ],
      ];
      const result = getUsedColors(grid);

      expect(result[0].floss).toBe('666'); // Red with count 2
      expect(result[1].floss).toBe('700'); // Green with count 1
    });

    it('should handle null cells', () => {
      const grid = [
        [null, { hex: 'ff0000', floss: '666', name: 'Red' }, null],
        [null, null, null],
      ];
      const result = getUsedColors(grid);

      expect(result).toHaveLength(1);
      expect(result[0].count).toBe(1);
    });
  });

  describe('assignSymbolsToColors', () => {
    const mockSymbols = [
      { symbol: 'A', description: 'Letter A' },
      { symbol: 'B', description: 'Letter B' },
      { symbol: 'C', description: 'Letter C' },
    ];

    it('should assign symbols to colors', () => {
      const usedColors = [
        { hex: 'ff0000', floss: '666', count: 2 },
        { hex: '00ff00', floss: '700', count: 1 },
      ];

      const result = assignSymbolsToColors(usedColors, mockSymbols);

      expect(result).toEqual({
        ff0000_666: 'A',
        '00ff00_700': 'B',
      });
    });

    it('should preserve existing assignments', () => {
      const usedColors = [
        { hex: 'ff0000', floss: '666', count: 2 },
        { hex: '00ff00', floss: '700', count: 1 },
      ];
      const existingAssignments = {
        ff0000_666: 'X',
      };

      const result = assignSymbolsToColors(usedColors, mockSymbols, existingAssignments);

      expect(result).toEqual({
        ff0000_666: 'X', // Preserved
        '00ff00_700': 'A', // First available symbol
      });
    });

    it('should skip already used symbols', () => {
      const usedColors = [
        { hex: 'ff0000', floss: '666', count: 2 },
        { hex: '00ff00', floss: '700', count: 1 },
        { hex: '0000ff', floss: '796', count: 1 },
      ];
      const existingAssignments = {
        ff0000_666: 'B', // B is taken
      };

      const result = assignSymbolsToColors(usedColors, mockSymbols, existingAssignments);

      expect(result['00ff00_700']).toBe('A'); // Skip B, use A
      expect(result['0000ff_796']).toBe('C'); // Use C
    });
  });

  describe('createColorSymbolMapping', () => {
    const mockSymbols = [
      { symbol: '■', description: 'Square' },
      { symbol: '●', description: 'Circle' },
    ];

    it('should create complete color-symbol mapping', () => {
      const grid = [
        [
          { hex: 'ff0000', floss: '666', name: 'Red' },
          { hex: 'ff0000', floss: '666', name: 'Red' },
        ],
        [{ hex: '00ff00', floss: '700', name: 'Green' }, null],
      ];

      const result = createColorSymbolMapping(grid, mockSymbols);

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        hex: 'ff0000',
        floss: '666',
        name: 'Red',
        count: 2,
        symbol: '■',
        key: 'ff0000_666',
      });
      expect(result[1]).toMatchObject({
        hex: '00ff00',
        floss: '700',
        name: 'Green',
        count: 1,
        symbol: '●',
        key: '00ff00_700',
      });
    });

    it('should respect custom assignments', () => {
      const grid = [[{ hex: 'ff0000', floss: '666', name: 'Red' }]];
      const customAssignments = {
        ff0000_666: 'X',
      };

      const result = createColorSymbolMapping(grid, mockSymbols, customAssignments);

      expect(result[0].symbol).toBe('X');
    });

    it('should handle empty grid', () => {
      const grid = [[]];
      const result = createColorSymbolMapping(grid, mockSymbols);
      expect(result).toEqual([]);
    });
  });
});
