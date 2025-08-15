import React, { useContext } from 'react';
import { GridContext } from '../GridContext';
import './ColorLegend.css';

const ColorLegend = () => {
  const { colorSymbolMapping, showSymbols } = useContext(GridContext);

  if (!colorSymbolMapping || colorSymbolMapping.length === 0) {
    return (
      <div className="color-legend-empty">
        <p>No colours in use</p>
      </div>
    );
  }

  return (
    <div className="color-legend">
      <h4 className="color-legend-title">Colours in Use</h4>
      <div className="color-legend-list">
        {colorSymbolMapping.map((color) => (
          <div key={color.key} className="color-legend-item">
            {showSymbols && <div className="legend-symbol">{color.symbol}</div>}
            <div
              className="legend-color-swatch"
              style={{ backgroundColor: `#${color.hex}` }}
              title={color.name}
            />
            <div className="legend-color-info">
              <span className="legend-floss">{color.floss}</span>
              <span className="legend-name">{color.name}</span>
              <span className="legend-count">{color.count} stitches</span>
            </div>
          </div>
        ))}
      </div>
      <div className="legend-stats">Total colours: {colorSymbolMapping.length}</div>
    </div>
  );
};

export default ColorLegend;
