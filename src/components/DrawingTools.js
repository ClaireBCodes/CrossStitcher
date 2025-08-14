import { useContext, useState } from 'react';
import { GridContext } from './GridContext';

const DrawingTool = ({ handleCellInteraction }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const { grid, setGrid } = useContext(GridContext);

  const _handleCellInteraction = (row, col, drawing = false) => {
    console.log('DrawingTool: _handleCellInteraction', row, col, drawing, isDrawing);
    if (!(drawing || isDrawing)) return;

    const newGrid = handleCellInteraction(row, col, grid);
    console.log('DrawingTool: _handleCellInteraction: newgrid', newGrid);
    setGrid(newGrid);
  };

  const onMouseDown = (row, col) => {
    setIsDrawing(true);
    return _handleCellInteraction(row, col, true);
  };

  const onMouseUp = () => {
    setIsDrawing(false);
  };

  const onClick = (row, col) => {
    return _handleCellInteraction(row, col, true);
  };

  const onMouseEnter = (row, col) => {
    return _handleCellInteraction(row, col);
  };

  return {
    onMouseDown,
    onMouseUp,
    onClick,
    onMouseEnter,
  };
};

const PencilTool = () => {
  const { selectedColour } = useContext(GridContext);

  const handleCellInteraction = (row, col, grid) => {
    const newGrid = [...grid];
    newGrid[row][col] = selectedColour;
    return newGrid;
  };

  return DrawingTool({ handleCellInteraction });
};

const EraserTool = () => {
  const handleCellInteraction = (row, col, grid) => {
    const newGrid = [...grid];
    newGrid[row][col] = null;
    return newGrid;
  };

  return DrawingTool({ handleCellInteraction });
};

export { PencilTool, EraserTool };
