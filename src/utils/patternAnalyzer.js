/**
 * Analyzes a pattern grid to extract information about used colors
 * @param {Array} grid - 2D array of cells containing color objects or null
 * @returns {Object} Map of color keys to color info including count
 */
export const getUsedColors = (grid) => {
  const colorMap = new Map();

  // Iterate through the grid
  grid.forEach((row) => {
    row.forEach((cell) => {
      if (cell && cell.hex) {
        // Create a unique key for the color
        const colorKey = `${cell.hex}_${cell.floss || 'unknown'}`;

        if (colorMap.has(colorKey)) {
          // Increment count for existing color
          const colorInfo = colorMap.get(colorKey);
          colorInfo.count++;
        } else {
          // Add new color to map
          colorMap.set(colorKey, {
            hex: cell.hex,
            floss: cell.floss || 'unknown',
            name: cell.name || 'Unknown',
            r: cell.r,
            g: cell.g,
            b: cell.b,
            count: 1,
          });
        }
      }
    });
  });

  // Convert Map to array and sort by count (most used first)
  const sortedColors = Array.from(colorMap.values()).sort((a, b) => b.count - a.count);

  return sortedColors;
};

/**
 * Assigns symbols to colors based on usage frequency
 * @param {Array} usedColors - Array of used colors sorted by count
 * @param {Array} symbols - Array of available symbols
 * @param {Object} existingAssignments - Existing symbol assignments to preserve
 * @returns {Object} Map of color keys to assigned symbols
 */
export const assignSymbolsToColors = (usedColors, symbols, existingAssignments = {}) => {
  const assignments = { ...existingAssignments };
  const usedSymbols = new Set(Object.values(existingAssignments));
  let symbolIndex = 0;

  usedColors.forEach((color) => {
    const colorKey = `${color.hex}_${color.floss}`;

    // Skip if already has assignment
    if (assignments[colorKey]) {
      return;
    }

    // Find next available symbol
    while (symbolIndex < symbols.length && usedSymbols.has(symbols[symbolIndex].symbol)) {
      symbolIndex++;
    }

    // Assign symbol if available
    if (symbolIndex < symbols.length) {
      assignments[colorKey] = symbols[symbolIndex].symbol;
      usedSymbols.add(symbols[symbolIndex].symbol);
      symbolIndex++;
    }
  });

  return assignments;
};

/**
 * Creates a complete color-symbol mapping for the pattern
 * @param {Array} grid - The pattern grid
 * @param {Array} symbols - Available symbols
 * @param {Object} customAssignments - User's custom symbol assignments
 * @returns {Array} Array of color objects with symbol assignments
 */
export const createColorSymbolMapping = (grid, symbols, customAssignments = {}) => {
  const usedColors = getUsedColors(grid);
  const symbolAssignments = assignSymbolsToColors(usedColors, symbols, customAssignments);

  // Add symbol to each color object
  const mappedColors = usedColors.map((color) => {
    const colorKey = `${color.hex}_${color.floss}`;
    return {
      ...color,
      symbol: symbolAssignments[colorKey] || '?',
      key: colorKey,
    };
  });

  return mappedColors;
};
