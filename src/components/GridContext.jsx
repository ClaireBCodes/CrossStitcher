import React, { useEffect, useCallback } from 'react';
import { useState } from 'react';
import useUndoRedo from '../hooks/useUndoRedo';

const GridContext = React.createContext();

const blankGrid = (x_size, y_size) => {
  return Array(y_size).fill().map(() => Array(x_size).fill(null));
}

const GridProvider = ({children, initialSelectedColour = null, initialGrid = null, initialSelectedTool='pencil'}) => {
  const defaultGrid = initialGrid || blankGrid(50, 50);
  const {
    state: grid,
    setState: setGridWithHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory
  } = useUndoRedo(defaultGrid);
  
  const [selectedColour, setSelectedColour] = useState(initialSelectedColour);
  const [selectedTool, setSelectedTool] = useState(initialSelectedTool);
  const [gridSize, setGridSize] = useState({ width: 50, height: 50 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [canvasBackground, setCanvasBackground] = useState('#f5f5f5');
  
  // Wrapper for setGrid to maintain compatibility
  const setGrid = useCallback((newGrid) => {
    if (typeof newGrid === 'function') {
      setGridWithHistory(newGrid(grid));
    } else {
      setGridWithHistory(newGrid);
    }
  }, [grid, setGridWithHistory]);

  // Function to change grid size
  const changeGridSize = useCallback((width, height) => {
    const newGrid = blankGrid(width, height);
    // Copy existing pattern to new grid (centered if smaller, cropped if larger)
    const minWidth = Math.min(width, grid[0]?.length || 0);
    const minHeight = Math.min(height, grid.length);
    
    for (let y = 0; y < minHeight; y++) {
      for (let x = 0; x < minWidth; x++) {
        newGrid[y][x] = grid[y][x];
      }
    }
    
    setGridWithHistory(newGrid);
    setGridSize({ width, height });
    clearHistory();
  }, [grid, setGridWithHistory, clearHistory]);

  // Zoom functions
  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(1);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if user is typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Ctrl/Cmd + Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey && canUndo) {
        e.preventDefault();
        undo();
      }
      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y for redo
      else if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') || 
               ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
        if (canRedo) {
          e.preventDefault();
          redo();
        }
      }
      // Tool shortcuts
      else if (e.key === 'p') {
        setSelectedTool('pencil');
      }
      else if (e.key === 'e') {
        setSelectedTool('eraser');
      }
      // Zoom shortcuts
      else if ((e.ctrlKey || e.metaKey) && e.key === '=') {
        e.preventDefault();
        zoomIn();
      }
      else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        zoomOut();
      }
      else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        resetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, undo, redo, zoomIn, zoomOut, resetZoom]);

  return (
    <GridContext.Provider value={{ 
      grid, 
      setGrid, 
      selectedColour, 
      setSelectedColour, 
      selectedTool, 
      setSelectedTool,
      undo,
      redo,
      canUndo,
      canRedo,
      gridSize,
      changeGridSize,
      zoomLevel,
      zoomIn,
      zoomOut,
      resetZoom,
      canvasBackground,
      setCanvasBackground
    }}>
      {children}
    </GridContext.Provider>
  );
}

export { GridContext, GridProvider, blankGrid };