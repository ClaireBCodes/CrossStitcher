import './Grid.css';
import { useContext, useMemo } from 'react';
import { GridContext } from './GridContext';
import { createDrawingTool } from '../utils/drawingTools';
import { GRID_CONFIG } from '../constants/editor';

const Grid = () => {
  const { 
    grid, 
    setGrid,
    selectedTool, 
    selectedColour,
    zoomLevel, 
    canvasBackground 
  } = useContext(GridContext);

  // Create drawing tool instance
  const drawingTool = useMemo(() => {
    return createDrawingTool(selectedTool, { grid, setGrid, selectedColour });
  }, [selectedTool, grid, setGrid, selectedColour]);

  const cellSize = Math.round(GRID_CONFIG.BASE_CELL_SIZE * zoomLevel);

  return (
    <div className="grid-wrapper">
      <div 
        className="cross-stitch-grid"
        style={{ 
          transform: `scale(${zoomLevel})`, 
          transformOrigin: 'center',
          backgroundColor: canvasBackground 
        }}
        onMouseLeave={() => drawingTool.onMouseUp()}
        role="application"
        aria-label="Cross-stitch pattern grid"
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
                onMouseDown={() => drawingTool.onMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => drawingTool.onMouseEnter(rowIndex, colIndex)}
                onMouseUp={() => drawingTool.onMouseUp()}
                onClick={() => drawingTool.onClick(rowIndex, colIndex)}
                role="gridcell"
                aria-label={`Cell ${rowIndex},${colIndex}${cell ? ` filled with ${cell.name || cell.description || 'color'}` : ''}`}
                tabIndex={-1}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;