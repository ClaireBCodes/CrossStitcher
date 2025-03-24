import React, { useState } from 'react';
import './ColorPalette.css';
import ColorSwatch from './ColorSwatch';
import ColorSearchBox from './ColorSearchBox';
import SelectedColorInfo from './SelectedColorInfo';

const ColorPalette = ({ colors, selectedColor, onSelectColor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter colors based on search term
  const filteredColors = colors.filter(color => 
    color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    color.floss.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="color-palette">
      <h3>DMC Colors</h3>
      
      <ColorSearchBox 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <SelectedColorInfo selectedColor={selectedColor} />
      
      <div className="color-list">
        {filteredColors.map(color => (
          <div
            key={color.floss}
            className={`color-item ${selectedColor?.floss === color.floss ? 'selected' : ''}`}
            onClick={() => onSelectColor(color)}
            title={`DMC ${color.floss} - ${color.name}`}
          >
            <ColorSwatch hexColor={color.hex} />
            <div className="color-code">{
              color.name == color.floss ? `${color.floss}` : `${color.name} ${color.floss}`
            }</div>
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
