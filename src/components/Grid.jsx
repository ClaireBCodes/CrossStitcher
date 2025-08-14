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
  const { grid, selectedTool, zoomLevel, canvasBackground } = useContext(GridContext);

  const {
    onMouseDown,
    onMouseUp,
    onClick,
    onMouseEnter
  } = toTool(selectedTool);

  const cellSize = Math.round(18 * zoomLevel); // Base cell size is 18px

  return (
    <div className="grid-wrapper">
      <div 
        className="cross-stitch-grid"
        style={{ 
          transform: `scale(${zoomLevel})`, 
          transformOrigin: 'center',
          backgroundColor: canvasBackground 
        }}
        onMouseLeave={onMouseUp} // Stop drawing if mouse leaves grid
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`grid-cell ${cell ? 'filled' : ''}`}
                style={{
                  backgroundColor: cell ? `#${cell.hex}` : canvasBackground,
                  width: `${cellSize}px`,
                  height: `${cellSize}px`
                }}
                onMouseDown={() => onMouseDown(rowIndex, colIndex, grid)}
                onMouseEnter={() => onMouseEnter(rowIndex, colIndex, grid)}
                onMouseUp={onMouseUp}
                onClick={() => onClick(rowIndex, colIndex, grid)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
