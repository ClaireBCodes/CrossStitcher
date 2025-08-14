import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CrossStitchEditor from '../CrossStitchEditor';
import { GridProvider } from '../GridContext';
import dmcColors from '../../assets/dmc.json';

describe('CrossStitchEditor Integration Tests', () => {
  const renderEditor = () => {
    return render(
      <GridProvider>
        <CrossStitchEditor colours={dmcColors} />
      </GridProvider>
    );
  };

  describe('Undo/Redo Functionality', () => {
    it('should enable undo after drawing and allow undoing changes', async () => {
      const { container } = renderEditor();
      
      // Find undo/redo buttons
      const undoButton = container.querySelector('[title="Undo (Ctrl+Z)"]');
      const redoButton = container.querySelector('[title="Redo (Ctrl+Y)"]');
      
      // Initially, undo should be disabled
      expect(undoButton).toHaveClass('btn-outline-dark');
      expect(undoButton).toBeDisabled();
      
      // Select a color
      const colorItems = container.querySelectorAll('.color-item');
      fireEvent.click(colorItems[0]); // Select first color
      
      // Draw on the grid
      const gridCells = container.querySelectorAll('.grid-cell');
      fireEvent.click(gridCells[0]);
      
      // After drawing, undo should be enabled
      await waitFor(() => {
        expect(undoButton).toHaveClass('btn-outline-secondary');
        expect(undoButton).not.toBeDisabled();
      });
      
      // Click undo
      fireEvent.click(undoButton);
      
      // After undo, redo should be enabled
      await waitFor(() => {
        expect(redoButton).toHaveClass('btn-outline-secondary');
        expect(redoButton).not.toBeDisabled();
      });
    });

    it('should support keyboard shortcuts for undo/redo', async () => {
      const { container } = renderEditor();
      
      // Select a color and draw
      const colorItems = container.querySelectorAll('.color-item');
      fireEvent.click(colorItems[0]);
      
      const gridCells = container.querySelectorAll('.grid-cell');
      fireEvent.click(gridCells[0]);
      fireEvent.click(gridCells[1]);
      
      // Test Ctrl+Z for undo
      fireEvent.keyDown(window, { key: 'z', ctrlKey: true });
      
      // Test Ctrl+Y for redo
      fireEvent.keyDown(window, { key: 'y', ctrlKey: true });
      
      // Test Ctrl+Shift+Z for redo
      fireEvent.keyDown(window, { key: 'z', ctrlKey: true, shiftKey: true });
    });
  });

  describe('Canvas Background', () => {
    it('should change grid cell background when selecting canvas background', async () => {
      const { container } = renderEditor();
      
      // Find and click on a background preset button
      const bgPresetButtons = container.querySelectorAll('.bg-preset-btn');
      const darkGrayButton = bgPresetButtons[2]; // Dark gray preset
      
      fireEvent.click(darkGrayButton);
      
      // Check that empty grid cells have the new background
      await waitFor(() => {
        const gridCells = container.querySelectorAll('.grid-cell:not(.filled)');
        expect(gridCells[0]).toHaveStyle({ backgroundColor: '#2d2d30' });
      });
      
      // Check that the grid itself has the background
      const grid = container.querySelector('.cross-stitch-grid');
      expect(grid).toHaveStyle({ backgroundColor: '#2d2d30' });
    });

    it('should support custom color picker for canvas background', async () => {
      const { container } = renderEditor();
      
      // Find the custom color input
      const colorInput = container.querySelector('input[type="color"]');
      expect(colorInput).toBeInTheDocument();
      
      // Change the color
      fireEvent.change(colorInput, { target: { value: '#ff0000' } });
      
      // Check that grid cells update
      await waitFor(() => {
        const gridCells = container.querySelectorAll('.grid-cell:not(.filled)');
        expect(gridCells[0]).toHaveStyle({ backgroundColor: '#ff0000' });
      });
    });
  });

  describe('Zoom Controls', () => {
    it('should zoom in and out when clicking zoom buttons', async () => {
      const { container } = renderEditor();
      
      // Find zoom controls
      const zoomInButton = container.querySelector('[title="Zoom In (Ctrl+=)"]');
      const zoomOutButton = container.querySelector('[title="Zoom Out (Ctrl+-)"]');
      const zoomLevel = container.querySelector('.zoom-level');
      
      expect(zoomLevel).toHaveTextContent('100%');
      
      // Click zoom in
      fireEvent.click(zoomInButton);
      await waitFor(() => {
        expect(zoomLevel).toHaveTextContent('125%');
      });
      
      // Click zoom out
      fireEvent.click(zoomOutButton);
      await waitFor(() => {
        expect(zoomLevel).toHaveTextContent('100%');
      });
    });

    it('should support keyboard shortcuts for zoom', () => {
      renderEditor();
      
      // Test Ctrl+= for zoom in
      fireEvent.keyDown(window, { key: '=', ctrlKey: true });
      
      // Test Ctrl+- for zoom out
      fireEvent.keyDown(window, { key: '-', ctrlKey: true });
      
      // Test Ctrl+0 for reset zoom
      fireEvent.keyDown(window, { key: '0', ctrlKey: true });
    });
  });

  describe('Grid Size Adjustment', () => {
    it('should allow changing grid size', async () => {
      const { container } = renderEditor();
      
      // Find grid size inputs
      const inputs = container.querySelectorAll('.grid-size-controls input[type="number"]');
      const widthInput = inputs[0];
      const heightInput = inputs[1];
      const applyButton = screen.getByText(/Apply Size/i).closest('button');
      
      // Change size
      await userEvent.clear(widthInput);
      await userEvent.type(widthInput, '30');
      await userEvent.clear(heightInput);
      await userEvent.type(heightInput, '30');
      
      // Mock window.confirm
      const originalConfirm = window.confirm;
      window.confirm = vi.fn(() => true);
      
      // Apply changes
      fireEvent.click(applyButton);
      
      // Restore confirm
      window.confirm = originalConfirm;
      
      // Check that grid size changed
      await waitFor(() => {
        const gridCells = container.querySelectorAll('.grid-cell');
        expect(gridCells).toHaveLength(900); // 30x30
      });
    });
  });
});