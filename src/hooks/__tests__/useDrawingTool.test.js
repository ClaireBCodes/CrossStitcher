import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useDrawingTool from '../useDrawingTool';
import { TOOLS } from '../../constants/editor';

describe('useDrawingTool Hook', () => {
  let mockSetGrid;
  let initialGrid;
  let selectedColour;

  beforeEach(() => {
    mockSetGrid = vi.fn();
    initialGrid = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    selectedColour = { hex: 'ff0000', name: 'Red', floss: '666' };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Pencil Tool', () => {
    it('should fill a single cell on click', () => {
      const { result } = renderHook(() =>
        useDrawingTool(TOOLS.PENCIL, initialGrid, mockSetGrid, selectedColour)
      );

      act(() => {
        result.current.onClick(1, 1);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(1);
      const updatedGrid = mockSetGrid.mock.calls[0][0];
      expect(updatedGrid[1][1]).toEqual(selectedColour);
      expect(updatedGrid[0][0]).toBeNull();
    });

    it('should start drawing on mouse down', () => {
      const { result } = renderHook(() =>
        useDrawingTool(TOOLS.PENCIL, initialGrid, mockSetGrid, selectedColour)
      );

      expect(result.current.isDrawing).toBe(false);

      act(() => {
        result.current.onMouseDown(0, 0);
      });

      expect(result.current.isDrawing).toBe(true);
      expect(mockSetGrid).toHaveBeenCalledTimes(1);
      const updatedGrid = mockSetGrid.mock.calls[0][0];
      expect(updatedGrid[0][0]).toEqual(selectedColour);
    });

    it('should stop drawing on mouse up', () => {
      const { result } = renderHook(() =>
        useDrawingTool(TOOLS.PENCIL, initialGrid, mockSetGrid, selectedColour)
      );

      act(() => {
        result.current.onMouseDown(0, 0);
      });

      expect(result.current.isDrawing).toBe(true);

      act(() => {
        result.current.onMouseUp();
      });

      expect(result.current.isDrawing).toBe(false);
    });

    it('should draw continuously when dragging (click and drag)', () => {
      const { result, rerender } = renderHook(
        ({ tool, grid, setGrid, colour }) => useDrawingTool(tool, grid, setGrid, colour),
        {
          initialProps: {
            tool: TOOLS.PENCIL,
            grid: initialGrid,
            setGrid: mockSetGrid,
            colour: selectedColour,
          },
        }
      );

      // Start drawing
      act(() => {
        result.current.onMouseDown(0, 0);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(1);
      let updatedGrid = mockSetGrid.mock.calls[0][0];
      expect(updatedGrid[0][0]).toEqual(selectedColour);

      // Simulate grid update after first cell
      rerender({
        tool: TOOLS.PENCIL,
        grid: updatedGrid,
        setGrid: mockSetGrid,
        colour: selectedColour,
      });

      // Drag to next cell
      act(() => {
        result.current.onMouseEnter(0, 1);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(2);
      updatedGrid = mockSetGrid.mock.calls[1][0];
      expect(updatedGrid[0][1]).toEqual(selectedColour);

      // Simulate grid update after second cell
      rerender({
        tool: TOOLS.PENCIL,
        grid: updatedGrid,
        setGrid: mockSetGrid,
        colour: selectedColour,
      });

      // Drag to another cell
      act(() => {
        result.current.onMouseEnter(1, 1);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(3);
      updatedGrid = mockSetGrid.mock.calls[2][0];
      expect(updatedGrid[1][1]).toEqual(selectedColour);

      // Stop drawing
      act(() => {
        result.current.onMouseUp();
      });

      expect(result.current.isDrawing).toBe(false);

      // Should not draw when not dragging
      act(() => {
        result.current.onMouseEnter(2, 2);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(3); // No additional calls
    });

    it('should not draw when entering cells without mouse down', () => {
      const { result } = renderHook(() =>
        useDrawingTool(TOOLS.PENCIL, initialGrid, mockSetGrid, selectedColour)
      );

      act(() => {
        result.current.onMouseEnter(1, 1);
      });

      expect(mockSetGrid).not.toHaveBeenCalled();
      expect(result.current.isDrawing).toBe(false);
    });

    it('should not draw when no color is selected', () => {
      const { result } = renderHook(() =>
        useDrawingTool(TOOLS.PENCIL, initialGrid, mockSetGrid, null)
      );

      act(() => {
        result.current.onClick(1, 1);
      });

      expect(mockSetGrid).not.toHaveBeenCalled();
    });
  });

  describe('Eraser Tool', () => {
    const filledGrid = [
      [selectedColour, selectedColour, null],
      [selectedColour, selectedColour, null],
      [null, null, null],
    ];

    it('should erase a single cell on click', () => {
      const { result } = renderHook(() =>
        useDrawingTool(TOOLS.ERASER, filledGrid, mockSetGrid, selectedColour)
      );

      act(() => {
        result.current.onClick(0, 0);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(1);
      const updatedGrid = mockSetGrid.mock.calls[0][0];
      expect(updatedGrid[0][0]).toBeNull();
      expect(updatedGrid[0][1]).toEqual(filledGrid[0][1]); // Other cells unchanged
    });

    it('should erase continuously when dragging', () => {
      const { result, rerender } = renderHook(
        ({ tool, grid, setGrid, colour }) => useDrawingTool(tool, grid, setGrid, colour),
        {
          initialProps: {
            tool: TOOLS.ERASER,
            grid: filledGrid,
            setGrid: mockSetGrid,
            colour: selectedColour,
          },
        }
      );

      // Start erasing
      act(() => {
        result.current.onMouseDown(0, 0);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(1);
      let updatedGrid = mockSetGrid.mock.calls[0][0];
      expect(updatedGrid[0][0]).toBeNull();

      // Simulate grid update
      rerender({
        tool: TOOLS.ERASER,
        grid: updatedGrid,
        setGrid: mockSetGrid,
        colour: selectedColour,
      });

      // Drag to erase next cell
      act(() => {
        result.current.onMouseEnter(0, 1);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(2);
      updatedGrid = mockSetGrid.mock.calls[1][0];
      expect(updatedGrid[0][1]).toBeNull();

      // Simulate grid update
      rerender({
        tool: TOOLS.ERASER,
        grid: updatedGrid,
        setGrid: mockSetGrid,
        colour: selectedColour,
      });

      // Drag to erase another cell
      act(() => {
        result.current.onMouseEnter(1, 0);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(3);
      updatedGrid = mockSetGrid.mock.calls[2][0];
      expect(updatedGrid[1][0]).toBeNull();

      // Stop erasing
      act(() => {
        result.current.onMouseUp();
      });

      expect(result.current.isDrawing).toBe(false);
    });

    it('should work even when no color is selected', () => {
      const { result } = renderHook(() =>
        useDrawingTool(TOOLS.ERASER, filledGrid, mockSetGrid, null)
      );

      act(() => {
        result.current.onClick(0, 0);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(1);
      const updatedGrid = mockSetGrid.mock.calls[0][0];
      expect(updatedGrid[0][0]).toBeNull();
    });
  });

  describe('Global Mouse Up Handler', () => {
    it('should stop drawing when mouse is released outside the grid', () => {
      const { result } = renderHook(() =>
        useDrawingTool(TOOLS.PENCIL, initialGrid, mockSetGrid, selectedColour)
      );

      // Start drawing
      act(() => {
        result.current.onMouseDown(0, 0);
      });

      expect(result.current.isDrawing).toBe(true);

      // Simulate global mouse up event
      act(() => {
        const event = new MouseEvent('mouseup', { bubbles: true });
        window.dispatchEvent(event);
      });

      expect(result.current.isDrawing).toBe(false);
    });

    it('should clean up event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook(() =>
        useDrawingTool(TOOLS.PENCIL, initialGrid, mockSetGrid, selectedColour)
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });
  });

  describe('Tool Switching', () => {
    it('should update behavior when tool changes', () => {
      const { result, rerender } = renderHook(
        ({ tool, grid, setGrid, colour }) => useDrawingTool(tool, grid, setGrid, colour),
        {
          initialProps: {
            tool: TOOLS.PENCIL,
            grid: initialGrid,
            setGrid: mockSetGrid,
            colour: selectedColour,
          },
        }
      );

      // Draw with pencil
      act(() => {
        result.current.onClick(0, 0);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(1);
      let updatedGrid = mockSetGrid.mock.calls[0][0];
      expect(updatedGrid[0][0]).toEqual(selectedColour);

      // Switch to eraser
      rerender({
        tool: TOOLS.ERASER,
        grid: updatedGrid,
        setGrid: mockSetGrid,
        colour: selectedColour,
      });

      // Erase the cell
      act(() => {
        result.current.onClick(0, 0);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(2);
      updatedGrid = mockSetGrid.mock.calls[1][0];
      expect(updatedGrid[0][0]).toBeNull();
    });
  });

  describe('Color Changes', () => {
    it('should use the new color when color changes during drawing', () => {
      const blueColour = { hex: '0000ff', name: 'Blue', floss: '800' };

      const { result, rerender } = renderHook(
        ({ tool, grid, setGrid, colour }) => useDrawingTool(tool, grid, setGrid, colour),
        {
          initialProps: {
            tool: TOOLS.PENCIL,
            grid: initialGrid,
            setGrid: mockSetGrid,
            colour: selectedColour,
          },
        }
      );

      // Draw with red
      act(() => {
        result.current.onClick(0, 0);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(1);
      let updatedGrid = mockSetGrid.mock.calls[0][0];
      expect(updatedGrid[0][0]).toEqual(selectedColour);

      // Change color to blue
      rerender({
        tool: TOOLS.PENCIL,
        grid: updatedGrid,
        setGrid: mockSetGrid,
        colour: blueColour,
      });

      // Draw with blue
      act(() => {
        result.current.onClick(0, 1);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(2);
      updatedGrid = mockSetGrid.mock.calls[1][0];
      expect(updatedGrid[0][1]).toEqual(blueColour);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid clicking', () => {
      const { result } = renderHook(() =>
        useDrawingTool(TOOLS.PENCIL, initialGrid, mockSetGrid, selectedColour)
      );

      // Rapid clicks
      act(() => {
        result.current.onClick(0, 0);
        result.current.onClick(0, 1);
        result.current.onClick(1, 0);
        result.current.onClick(1, 1);
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(4);
    });

    it('should handle mouse down followed by immediate mouse up', () => {
      const { result } = renderHook(() =>
        useDrawingTool(TOOLS.PENCIL, initialGrid, mockSetGrid, selectedColour)
      );

      act(() => {
        result.current.onMouseDown(0, 0);
        result.current.onMouseUp();
      });

      expect(mockSetGrid).toHaveBeenCalledTimes(1);
      expect(result.current.isDrawing).toBe(false);
    });

    it('should handle multiple mouse ups without mouse down', () => {
      const { result } = renderHook(() =>
        useDrawingTool(TOOLS.PENCIL, initialGrid, mockSetGrid, selectedColour)
      );

      act(() => {
        result.current.onMouseUp();
        result.current.onMouseUp();
      });

      expect(result.current.isDrawing).toBe(false);
      expect(mockSetGrid).not.toHaveBeenCalled();
    });
  });
});
