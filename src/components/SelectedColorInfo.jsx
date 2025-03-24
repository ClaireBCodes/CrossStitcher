import React from 'react';
import ColorSwatch from './ColorSwatch';

const SelectedColorInfo = ({ selectedColor }) => {
  if (!selectedColor) return null;
  
  return (
    <div className="selected-color-info">
      <ColorSwatch hexColor={selectedColor.hex} />
      <div className="color-details">
        <div>DMC {selectedColor.floss}</div>
        <div>{selectedColor.name}</div>
      </div>
    </div>
  );
};

export default SelectedColorInfo;
