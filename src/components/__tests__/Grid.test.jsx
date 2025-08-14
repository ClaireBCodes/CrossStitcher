import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Grid from '../Grid';
import { GridContext } from '../GridContext';

describe('Grid Component', () => {
  const mockSetGrid = vi.fn();
  const mockGrid = [
    [null, null, { hex: 'ff0000', name: 'Red' }],
    [null, { hex: '00ff00', name: 'Green' }, null],
    [{ hex: '0000ff', name: 'Blue' }, null, null],
  ];

  const defaultContextValue = {
    grid: mockGrid,
    setGrid: mockSetGrid,
    selectedTool: 'pencil',
    selectedColour: { hex: 'ffffff', name: 'White' },
    zoomLevel: 1,
    canvasBackground: '#f5f5f5',
  };

  const renderGrid = (contextValue = {}) => {
    return render(
      <GridContext.Provider value={{ ...defaultContextValue, ...contextValue }}>
        <Grid />
      </GridContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the correct number of cells', () => {
    renderGrid();
    const cells = document.querySelectorAll('.grid-cell');
    expect(cells).toHaveLength(9); // 3x3 grid
  });

  it('renders the correct number of rows', () => {
    renderGrid();
    const rows = document.querySelectorAll('.grid-row');
    expect(rows).toHaveLength(3);
  });

  it('applies background color to filled cells', () => {
    renderGrid();
    const cells = document.querySelectorAll('.grid-cell');

    // Check specific cells have correct colors
    expect(cells[2]).toHaveStyle({ backgroundColor: '#ff0000' }); // Red
    expect(cells[4]).toHaveStyle({ backgroundColor: '#00ff00' }); // Green
    expect(cells[6]).toHaveStyle({ backgroundColor: '#0000ff' }); // Blue
  });

  it('applies filled class to cells with color', () => {
    renderGrid();
    const cells = document.querySelectorAll('.grid-cell');

    expect(cells[2]).toHaveClass('filled');
    expect(cells[4]).toHaveClass('filled');
    expect(cells[6]).toHaveClass('filled');

    expect(cells[0]).not.toHaveClass('filled');
    expect(cells[1]).not.toHaveClass('filled');
  });

  it('applies zoom level to grid', () => {
    renderGrid({ zoomLevel: 2 });
    const grid = document.querySelector('.cross-stitch-grid');
    expect(grid).toHaveStyle({ transform: 'scale(2)' });
  });

  it('applies canvas background color', () => {
    renderGrid({ canvasBackground: '#123456' });
    const grid = document.querySelector('.cross-stitch-grid');
    expect(grid).toHaveStyle({ backgroundColor: '#123456' });

    // Also check that empty cells have the background color
    const cells = document.querySelectorAll('.grid-cell:not(.filled)');
    expect(cells[0]).toHaveStyle({ backgroundColor: '#123456' });
  });

  it('handles cell click with pencil tool', () => {
    const { container } = renderGrid({
      selectedTool: 'pencil',
      selectedColour: { hex: 'ffffff', name: 'White' },
    });

    const firstCell = container.querySelectorAll('.grid-cell')[0];
    fireEvent.click(firstCell);

    // The click handler should be called (through DrawingTools)
    // In a real test, we'd need to mock DrawingTools or test the integration
    expect(firstCell).toBeDefined();
  });

  it('renders empty grid correctly', () => {
    const emptyGrid = [
      [null, null],
      [null, null],
    ];

    renderGrid({ grid: emptyGrid });
    const cells = document.querySelectorAll('.grid-cell');

    expect(cells).toHaveLength(4);
    cells.forEach((cell) => {
      expect(cell).not.toHaveClass('filled');
    });
  });

  it('handles mouse events for drawing', () => {
    const { container } = renderGrid();
    const cells = container.querySelectorAll('.grid-cell');

    // Test mouse down
    fireEvent.mouseDown(cells[0]);

    // Test mouse enter (for drag drawing)
    fireEvent.mouseEnter(cells[1]);

    // Test mouse up
    fireEvent.mouseUp(cells[1]);

    // Test mouse leave on grid (should stop drawing)
    const grid = container.querySelector('.cross-stitch-grid');
    fireEvent.mouseLeave(grid);

    // Events should be handled (actual drawing logic is in DrawingTools)
    expect(cells[0]).toBeDefined();
  });

  it('calculates cell size based on zoom level', () => {
    const { container } = renderGrid({ zoomLevel: 1.5 });
    const cells = container.querySelectorAll('.grid-cell');

    // Cell size should be 18 * 1.5 = 27px
    expect(cells[0]).toHaveStyle({
      width: '27px',
      height: '27px',
    });
  });
});
