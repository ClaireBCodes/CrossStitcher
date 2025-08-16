import { useState, useCallback, useRef, useEffect } from 'react';
import { TOOLS } from '../constants/editor';

/**
 * Custom hook for managing drawing tool state and interactions
 * Maintains drawing state across renders to enable click-and-drag functionality
 */
const useDrawingTool = (selectedTool, grid, setGrid, selectedColour) => {
  const [isDrawing, setIsDrawing] = useState(false);

  // Use refs to access current values in callbacks without recreating them
  const gridRef = useRef(grid);
  const selectedColourRef = useRef(selectedColour);
  const selectedToolRef = useRef(selectedTool);

  // Update refs when props change
  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  useEffect(() => {
    selectedColourRef.current = selectedColour;
  }, [selectedColour]);

  useEffect(() => {
    selectedToolRef.current = selectedTool;
  }, [selectedTool]);

  // Apply the current tool to a cell
  const applyTool = useCallback(
    (rowIndex, colIndex) => {
      const currentGrid = gridRef.current;
      const currentTool = selectedToolRef.current;
      const currentColour = selectedColourRef.current;

      if (currentTool === TOOLS.PENCIL) {
        if (!currentColour) return;

        const newGrid = currentGrid.map((row, rIdx) =>
          row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? currentColour : cell))
        );
        setGrid(newGrid);
      } else if (currentTool === TOOLS.ERASER) {
        const newGrid = currentGrid.map((row, rIdx) =>
          row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? null : cell))
        );
        setGrid(newGrid);
      }
    },
    [setGrid]
  );

  // Mouse event handlers
  const onMouseDown = useCallback(
    (rowIndex, colIndex) => {
      setIsDrawing(true);
      applyTool(rowIndex, colIndex);
    },
    [applyTool]
  );

  const onMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const onMouseEnter = useCallback(
    (rowIndex, colIndex) => {
      if (isDrawing) {
        applyTool(rowIndex, colIndex);
      }
    },
    [isDrawing, applyTool]
  );

  const onClick = useCallback(
    (rowIndex, colIndex) => {
      applyTool(rowIndex, colIndex);
    },
    [applyTool]
  );

  // Global mouse up handler to stop drawing when mouse is released anywhere
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDrawing) {
        setIsDrawing(false);
      }
    };

    // Add listener to window to catch mouse up events outside the grid
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDrawing]);

  return {
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onClick,
    isDrawing,
  };
};

export default useDrawingTool;
