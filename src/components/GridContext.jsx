import React, { useEffect, useCallback, useState } from 'react';
import useUndoRedo from '../hooks/useUndoRedo';
import { GRID_CONFIG, ZOOM_CONFIG, TOOLS } from '../constants/editor';
import dmcColors from '../assets/dmc.json';

const GridContext = React.createContext();

const blankGrid = (x_size = GRID_CONFIG.DEFAULT_WIDTH, y_size = GRID_CONFIG.DEFAULT_HEIGHT) => {
  return Array(y_size)
    .fill()
    .map(() => Array(x_size).fill(null));
};

const GridProvider = ({
  children,
  initialSelectedColour = null,
  initialGrid = null,
  initialSelectedTool = TOOLS.PENCIL,
}) => {
  const defaultGrid = initialGrid || blankGrid();
  const {
    state: grid,
    setState: setGridWithHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
  } = useUndoRedo(defaultGrid);

  // Set first DMC color as default if no initial color is provided and DMC colors exist
  const defaultColor = initialSelectedColour || (dmcColors.length > 0 ? dmcColors[0] : null);
  const [selectedColour, setSelectedColour] = useState(defaultColor);
  const [selectedTool, setSelectedTool] = useState(initialSelectedTool);
  const [gridSize, setGridSize] = useState({
    width: GRID_CONFIG.DEFAULT_WIDTH,
    height: GRID_CONFIG.DEFAULT_HEIGHT,
  });
  const [zoomLevel, setZoomLevel] = useState(ZOOM_CONFIG.DEFAULT);
  const [canvasBackground, setCanvasBackground] = useState('#f5f5f5');

  // Wrapper for setGrid to maintain compatibility
  const setGrid = useCallback(
    (newGrid) => {
      if (typeof newGrid === 'function') {
        setGridWithHistory(newGrid(grid));
      } else {
        setGridWithHistory(newGrid);
      }
    },
    [grid, setGridWithHistory]
  );

  // Function to change grid size
  const changeGridSize = useCallback(
    (width, height) => {
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
    },
    [grid, setGridWithHistory, clearHistory]
  );

  // Zoom functions
  const zoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + ZOOM_CONFIG.STEP, ZOOM_CONFIG.MAX));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - ZOOM_CONFIG.STEP, ZOOM_CONFIG.MIN));
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(ZOOM_CONFIG.DEFAULT);
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
      else if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') ||
        ((e.ctrlKey || e.metaKey) && e.key === 'y')
      ) {
        if (canRedo) {
          e.preventDefault();
          redo();
        }
      }
      // Tool shortcuts
      else if (e.key === 'p') {
        setSelectedTool(TOOLS.PENCIL);
      } else if (e.key === 'e') {
        setSelectedTool(TOOLS.ERASER);
      }
      // Zoom shortcuts
      else if ((e.ctrlKey || e.metaKey) && e.key === '=') {
        e.preventDefault();
        zoomIn();
      } else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        zoomOut();
      } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        resetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, undo, redo, zoomIn, zoomOut, resetZoom]);

  return (
    <GridContext.Provider
      value={{
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
        setCanvasBackground,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export { GridContext, GridProvider };
