import React, { useState } from 'react';
import './ColorPalette.css';
import { useContext } from 'react';
import { GridContext } from './GridContext';

const ColorPalette = ({ colors }) => {
  const { selectedColour, setSelectedColour } = useContext(GridContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter colors based on search term
  const filteredColors = colors.filter(color => 
    color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    color.floss.toLowerCase().includes(searchTerm.toLowerCase())
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
        />
      </div>
      
      {selectedColour && (
        <div className="selected-color-info">
          <div 
            className="color-swatch" 
            style={{ backgroundColor: `#${selectedColour.hex}` }}
          />
          <div className="color-details">
            <div>DMC {selectedColour.floss}</div>
            <div>{selectedColour.name}</div>
          </div>
        </div>
      )}
      
      <div className="color-list">
        {filteredColors.map(color => (
          <div
            key={color.floss}
            className={`color-item ${selectedColour?.floss === color.floss ? 'selected' : ''}`}
            onClick={() => setSelectedColour(color)}
            title={`DMC ${color.floss} - ${color.name}`}
          >
            <div 
              className="color-swatch" 
              style={{ backgroundColor: `#${color.hex}` }}
            />
            <div className="color-code">{color.floss}</div>
          </div>
        ))}
      </div>
      
      {filteredColors.length === 0 && (
        <div className="no-colors-found">No colors match your search</div>
      )}
    </div>
  );
};

export default ColorPalette;
