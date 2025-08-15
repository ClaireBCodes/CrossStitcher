import React, { useContext, useState } from 'react';
import { GridContext } from '../GridContext';
import SymbolPicker from './SymbolPicker';
import './ColorLegend.css';

const ColorLegend = () => {
  const { colorSymbolMapping, showSymbols } = useContext(GridContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSymbolPicker, setShowSymbolPicker] = useState(false);

  if (!colorSymbolMapping || colorSymbolMapping.length === 0) {
    return (
      <div className="color-legend-empty">
        <p>No colours in use</p>
      </div>
    );
  }

  return (
    <div className="color-legend">
      <div className="color-legend-header" onClick={() => setIsExpanded(!isExpanded)}>
        <i className={`bi bi-chevron-${isExpanded ? 'down' : 'right'}`}></i>
        <h4 className="color-legend-title">Symbol chart</h4>
        <span className="legend-count-badge">{colorSymbolMapping.length}</span>
      </div>
      {isExpanded && (
        <>
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
          <div className="legend-actions">
            <button className="btn-select-symbols" onClick={() => setShowSymbolPicker(true)}>
              <i className="bi bi-palette2"></i>
              Select symbols
            </button>
          </div>
          <div className="legend-stats">Total colours: {colorSymbolMapping.length}</div>
        </>
      )}

      {showSymbolPicker && <SymbolPicker onClose={() => setShowSymbolPicker(false)} />}
    </div>
  );
};

export default ColorLegend;
