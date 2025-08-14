import { TOOLS } from '../constants/editor';

class DrawingTool {
  constructor(context) {
    this.context = context;
    this.isDrawing = false;
  }

  onMouseDown(rowIndex, colIndex) {
    this.isDrawing = true;
    this.applyTool(rowIndex, colIndex);
  }

  onMouseUp() {
    this.isDrawing = false;
  }

  onMouseEnter(rowIndex, colIndex) {
    if (this.isDrawing) {
      this.applyTool(rowIndex, colIndex);
    }
  }

  onClick(rowIndex, colIndex) {
    this.applyTool(rowIndex, colIndex);
  }

  // eslint-disable-next-line no-unused-vars
  applyTool(rowIndex, colIndex) {
    // Override in subclasses
  }
}

class PencilTool extends DrawingTool {
  applyTool(rowIndex, colIndex) {
    const { grid, selectedColour, setGrid } = this.context;

    if (!selectedColour) return;

    const newGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? selectedColour : cell))
    );

    setGrid(newGrid);
  }
}

class EraserTool extends DrawingTool {
  applyTool(rowIndex, colIndex) {
    const { grid, setGrid } = this.context;

    const newGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? null : cell))
    );

    setGrid(newGrid);
  }
}

export const createDrawingTool = (toolType, context) => {
  switch (toolType) {
    case TOOLS.PENCIL:
      return new PencilTool(context);
    case TOOLS.ERASER:
      return new EraserTool(context);
    default:
      throw new Error(`Unknown tool type: ${toolType}`);
  }
};
