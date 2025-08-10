import './Grid.css';
import { useContext } from 'react';
import { GridContext } from './GridContext';
import { PencilTool, EraserTool } from './DrawingTools';

const toTool = (tool) => {
  switch (tool) {
    case 'pencil':
      return PencilTool();
    case 'eraser':
      return EraserTool();
    default:
      throw new Error(`Unknown tool: ${tool}`);
  }
}

const Grid = () => {
  const { grid, selectedTool } = useContext(GridContext);

  const {
    onMouseDown,
    onMouseUp,
    onClick,
    onMouseEnter
  } = toTool(selectedTool);

  return (
    <div 
      className="cross-stitch-grid"
      onMouseLeave={onMouseUp} // Stop drawing if mouse leaves grid
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`grid-cell ${cell ? 'filled' : ''}`}
              style={cell ? { backgroundColor: `#${cell.hex}` } : {}}
              onMouseDown={() => onMouseDown(rowIndex, colIndex, grid)}
              onMouseEnter={() => onMouseEnter(rowIndex, colIndex, grid)}
              onMouseUp={onMouseUp}
              onClick={() => onClick(rowIndex, colIndex, grid)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
