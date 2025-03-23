import React from 'react';
import './Grid.css';

const Grid = ({ grid, onMouseDown, onMouseEnter, onMouseUp }) => {
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
              onMouseDown={() => onMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => onMouseEnter(rowIndex, colIndex)}
              onMouseUp={onMouseUp}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
