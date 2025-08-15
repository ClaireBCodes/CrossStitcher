/**
 * Grid utility functions
 */

/**
 * Creates a blank grid with specified dimensions
 * @param {number} width - Grid width
 * @param {number} height - Grid height
 * @returns {Array} 2D array filled with null values
 */
export const createBlankGrid = (width, height) => {
  return Array(height)
    .fill()
    .map(() => Array(width).fill(null));
};

/**
 * Clears a grid while preserving dimensions
 * @param {Array} grid - The grid to clear
 * @returns {Array} New grid with same dimensions, filled with null
 */
export const clearGrid = (grid) => {
  const height = grid.length;
  const width = grid[0]?.length || 0;
  return createBlankGrid(width, height);
};

/**
 * Resizes a grid, preserving existing content where possible
 * @param {Array} grid - Original grid
 * @param {number} newWidth - New width
 * @param {number} newHeight - New height
 * @returns {Array} Resized grid
 */
export const resizeGrid = (grid, newWidth, newHeight) => {
  const newGrid = createBlankGrid(newWidth, newHeight);
  const minWidth = Math.min(newWidth, grid[0]?.length || 0);
  const minHeight = Math.min(newHeight, grid.length);

  for (let y = 0; y < minHeight; y++) {
    for (let x = 0; x < minWidth; x++) {
      newGrid[y][x] = grid[y][x];
    }
  }

  return newGrid;
};

/**
 * Counts non-null cells in the grid
 * @param {Array} grid - The grid to count
 * @returns {number} Number of filled cells
 */
export const countFilledCells = (grid) => {
  let count = 0;
  grid.forEach((row) => {
    row.forEach((cell) => {
      if (cell !== null) count++;
    });
  });
  return count;
};

/**
 * Gets grid dimensions
 * @param {Array} grid - The grid
 * @returns {Object} Object with width and height
 */
export const getGridDimensions = (grid) => {
  return {
    height: grid.length,
    width: grid[0]?.length || 0,
  };
};

/**
 * Validates if a position is within grid bounds
 * @param {Array} grid - The grid
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @returns {boolean} True if position is valid
 */
export const isValidPosition = (grid, row, col) => {
  return row >= 0 && row < grid.length && col >= 0 && col < (grid[0]?.length || 0);
};
