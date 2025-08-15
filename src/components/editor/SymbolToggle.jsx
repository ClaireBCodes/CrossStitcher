import React, { useContext } from 'react';
import { GridContext } from '../GridContext';
import './SymbolToggle.css';

const SymbolToggle = () => {
  const { showSymbols, setShowSymbols } = useContext(GridContext);

  return (
    <div className="symbol-toggle-container">
      <label className="symbol-toggle">
        <input
          type="checkbox"
          checked={showSymbols}
          onChange={(e) => setShowSymbols(e.target.checked)}
        />
        <span className="toggle-slider"></span>
        <span className="toggle-label">Show Symbols</span>
      </label>
    </div>
  );
};

export default SymbolToggle;
