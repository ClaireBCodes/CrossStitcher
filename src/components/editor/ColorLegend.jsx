import React, { useContext, useState } from 'react';
import { GridContext } from '../GridContext';
import './ColorLegend.css';

const ColorLegend = () => {
  const { colorSymbolMapping, showSymbols, setSymbolAssignments, availableSymbols } =
    useContext(GridContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingColor, setEditingColor] = useState(null);

  const handleSymbolChange = (colorKey, newSymbol) => {
    setSymbolAssignments((prev) => ({
      ...prev,
      [colorKey]: newSymbol,
    }));
    setEditingColor(null);
  };

  const getAvailableSymbolsForColor = (currentSymbol) => {
    // Get all currently used symbols except the current one
    const usedSymbols = new Set(
      colorSymbolMapping.map((c) => c.symbol).filter((s) => s !== currentSymbol)
    );

    // Return symbols that aren't currently in use
    return availableSymbols.filter((s) => !usedSymbols.has(s.symbol));
  };

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
                {showSymbols &&
                  (editingColor === color.key ? (
                    <select
                      className="legend-symbol-select"
                      value={color.symbol}
                      onChange={(e) => handleSymbolChange(color.key, e.target.value)}
                      onBlur={() => setEditingColor(null)}
                      autoFocus
                    >
                      <option value={color.symbol}>{color.symbol}</option>
                      {getAvailableSymbolsForColor(color.symbol).map((sym) => (
                        <option key={sym.symbol} value={sym.symbol}>
                          {sym.symbol} - {sym.description}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div
                      className="legend-symbol clickable"
                      onClick={() => setEditingColor(color.key)}
                      title="Click to change symbol"
                    >
                      {color.symbol}
                    </div>
                  ))}
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
        </>
      )}
    </div>
  );
};

export default ColorLegend;
