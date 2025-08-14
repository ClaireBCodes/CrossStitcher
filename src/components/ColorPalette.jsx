import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './ColorPalette.css';
import { GridContext } from './GridContext';

const ColorPalette = ({ colors = [] }) => {
  const { selectedColour, setSelectedColour } = useContext(GridContext);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter colors based on search term
  const filteredColors = colors.filter(
    (color) =>
      (color.name?.toLowerCase() || color.description?.toLowerCase() || '').includes(
        searchTerm.toLowerCase()
      ) || (color.floss?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="color-palette">
      <h3>DMC Colors</h3>

      <div className="color-search">
        <input
          type="text"
          placeholder="Search colors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search colors"
        />
      </div>

      {selectedColour && (
        <div className="selected-color-info">
          <div
            className="color-swatch"
            style={{ backgroundColor: `#${selectedColour.hex}` }}
            aria-label={`Selected color: ${selectedColour.name || selectedColour.description}`}
          />
          <div className="color-details">
            <div>DMC {selectedColour.floss}</div>
            <div>{selectedColour.name || selectedColour.description}</div>
          </div>
        </div>
      )}

      <div className="color-list" role="list">
        {filteredColors.map((color) => (
          <div
            key={color.floss}
            className={`color-item ${selectedColour?.floss === color.floss ? 'selected' : ''}`}
            onClick={() => setSelectedColour(color)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedColour(color);
              }
            }}
            title={`DMC ${color.floss} - ${color.name || color.description}`}
            role="listitem"
            tabIndex={0}
            aria-selected={selectedColour?.floss === color.floss}
          >
            <div className="color-swatch" style={{ backgroundColor: `#${color.hex}` }} />
            <div className="color-code">{color.floss}</div>
          </div>
        ))}
      </div>

      {filteredColors.length === 0 && <div className="no-colors-found">No colors found</div>}
    </div>
  );
};

ColorPalette.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      floss: PropTypes.string.isRequired,
      hex: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      red: PropTypes.number,
      green: PropTypes.number,
      blue: PropTypes.number,
    })
  ),
};

export default ColorPalette;
