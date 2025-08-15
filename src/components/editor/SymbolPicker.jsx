import React, { useContext, useState } from 'react';
import { GridContext } from '../GridContext';
import './SymbolPicker.css';

const SymbolPicker = ({ onClose }) => {
  const { colorSymbolMapping, setSymbolAssignments, availableSymbols } = useContext(GridContext);

  // Select first color by default
  const [selectedColor, setSelectedColor] = useState(
    colorSymbolMapping && colorSymbolMapping.length > 0 ? colorSymbolMapping[0].key : null
  );

  const handleSymbolSelect = (symbol) => {
    if (!selectedColor) return;

    // Check if this symbol is already in use by another color
    const symbolInUse = colorSymbolMapping.some(
      (c) => c.key !== selectedColor && c.symbol === symbol
    );

    if (!symbolInUse) {
      setSymbolAssignments((prev) => ({
        ...prev,
        [selectedColor]: symbol,
      }));
      // Don't clear selection - stay on the same color
      // setSelectedColor(null);
    }
  };

  const getSymbolForColor = (colorKey) => {
    const color = colorSymbolMapping.find((c) => c.key === colorKey);
    return color ? color.symbol : '?';
  };

  const isSymbolInUse = (symbol) => {
    return colorSymbolMapping.some((c) => c.symbol === symbol);
  };

  if (!colorSymbolMapping || colorSymbolMapping.length === 0) {
    return (
      <div className="symbol-picker-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Select Symbols</h3>
            <button className="close-button" onClick={onClose}>
              <i className="bi bi-x"></i>
            </button>
          </div>
          <div className="modal-body">
            <p className="empty-message">No colors in pattern yet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="symbol-picker-modal">
      <div className="modal-content symbol-picker-content">
        <div className="modal-header">
          <h3>Select Symbols</h3>
          <button className="close-button" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <div className="modal-body symbol-picker-body">
          <div className="colors-panel">
            <h4>Colors in Pattern</h4>
            <div className="color-list">
              {colorSymbolMapping.map((color) => (
                <div
                  key={color.key}
                  className={`color-item ${selectedColor === color.key ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color.key)}
                >
                  <div className="color-symbol">{getSymbolForColor(color.key)}</div>
                  <div className="color-swatch" style={{ backgroundColor: `#${color.hex}` }} />
                  <div className="color-details">
                    <span className="color-floss">{color.floss}</span>
                    <span className="color-name">{color.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="symbols-panel">
            <h4>
              {selectedColor
                ? `Select Symbol for ${colorSymbolMapping.find((c) => c.key === selectedColor)?.name}`
                : 'Select a color first'}
            </h4>
            {selectedColor ? (
              <div className="symbols-grid">
                {availableSymbols.map((sym) => {
                  const inUse = isSymbolInUse(sym.symbol);
                  const isCurrent = getSymbolForColor(selectedColor) === sym.symbol;

                  return (
                    <div
                      key={sym.symbol}
                      className={`symbol-option ${inUse && !isCurrent ? 'in-use' : ''} ${isCurrent ? 'current' : ''}`}
                      onClick={() => (!inUse || isCurrent ? handleSymbolSelect(sym.symbol) : null)}
                      title={`${sym.description}${inUse && !isCurrent ? ' (in use)' : ''}`}
                    >
                      <div className="symbol-display">{sym.symbol}</div>
                      <div className="symbol-type">{sym.type}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="symbols-placeholder">
                <i className="bi bi-arrow-left"></i>
                <p>Click on a color to select its symbol</p>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SymbolPicker;
