import React from 'react';

const ColorSwatch = ({ hexColor }) => {
  return (
    <div 
      className="color-swatch" 
      style={{ backgroundColor: `#${hexColor}` }}
    />
  );
};

export default ColorSwatch;
