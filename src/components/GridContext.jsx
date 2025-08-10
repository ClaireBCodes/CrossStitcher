import React, { useEffect } from 'react';
import { useState } from 'react';

const GridContext = React.createContext();

const blankGrid = (x_size, y_size) => {
  return Array(y_size).fill().map(() => Array(x_size).fill(null));
}

const GridProvider = ({children, initialSelectedColour = null, initialGrid = null, initialSelectedTool='pencil'}) => {
  const [grid, setGrid] = useState(initialGrid || blankGrid(50, 50)); // Default grid size
  const [selectedColour, setSelectedColour] = useState(initialSelectedColour);
  const [selectedTool, setSelectedTool] = useState(initialSelectedTool); // Default tool
  

  return (
    <GridContext.Provider value={{ grid, setGrid, selectedColour, setSelectedColour, selectedTool, setSelectedTool }}>
      {children}
    </GridContext.Provider>
  );
}

export { GridContext, GridProvider, blankGrid };