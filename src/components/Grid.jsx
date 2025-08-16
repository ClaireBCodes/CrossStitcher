import './Grid.css';
import { useContext } from 'react';
import { GridContext } from './GridContext';
import useDrawingTool from '../hooks/useDrawingTool';
import { GRID_CONFIG } from '../constants/editor';

const Grid = () => {
  const {
    grid,
    setGrid,
    selectedTool,
    selectedColour,
    zoomLevel,
    canvasBackground,
    showSymbols,
    colorSymbolMapping,
  } = useContext(GridContext);

  // Use the drawing tool hook for proper state management
  const { onMouseDown, onMouseUp, onMouseEnter, onClick } = useDrawingTool(
    selectedTool,
    grid,
    setGrid,
    selectedColour
  );

  const cellSize = Math.round(GRID_CONFIG.BASE_CELL_SIZE * zoomLevel);

  // Function to get symbol for a cell
  const getSymbolForCell = (cell) => {
    if (!cell || !showSymbols || !colorSymbolMapping) return null;

    const colorKey = `${cell.hex}_${cell.floss || 'unknown'}`;
    const colorData = colorSymbolMapping.find((c) => c.key === colorKey);
    return colorData ? colorData.symbol : null;
  };

  return (
    <div className="grid-wrapper">
      <div
        className="cross-stitch-grid"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center',
          backgroundColor: canvasBackground,
        }}
        onMouseLeave={onMouseUp}
        role="application"
        aria-label="Cross-stitch pattern grid"
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, colIndex) => {
              const symbol = getSymbolForCell(cell);
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`grid-cell ${cell ? 'filled' : ''} ${symbol ? 'has-symbol' : ''}`}
                  style={{
                    backgroundColor: cell ? `#${cell.hex}` : canvasBackground,
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                  }}
                  onMouseDown={() => onMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => onMouseEnter(rowIndex, colIndex)}
                  onMouseUp={onMouseUp}
                  onClick={() => onClick(rowIndex, colIndex)}
                  role="gridcell"
                  aria-label={`Cell ${rowIndex},${colIndex}${cell ? ` filled with ${cell.name || cell.description || 'color'}` : ''}`}
                  tabIndex={-1}
                >
                  {symbol && <span className="grid-cell-symbol">{symbol}</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
