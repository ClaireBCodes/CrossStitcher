import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColorPalette from '../ColorPalette';
import { GridContext } from '../GridContext';

describe('ColorPalette Component', () => {
  const mockSetSelectedColour = vi.fn();

  const mockColors = [
    { floss: '310', description: 'Black', red: 0, green: 0, blue: 0, hex: '000000' },
    { floss: '666', description: 'Bright Red', red: 227, green: 29, blue: 66, hex: 'E31D42' },
    { floss: '701', description: 'Green', red: 71, green: 167, blue: 47, hex: '47A72F' },
    { floss: '796', description: 'Dark Royal Blue', red: 17, green: 65, blue: 109, hex: '11416D' },
    { floss: 'White', description: 'White', red: 255, green: 255, blue: 255, hex: 'FFFFFF' },
  ];

  const defaultContextValue = {
    selectedColour: null,
    setSelectedColour: mockSetSelectedColour,
    grid: [],
    setGrid: vi.fn(),
    selectedTool: 'pencil',
  };

  const renderColorPalette = (props = {}, contextValue = {}) => {
    return render(
      <GridContext.Provider value={{ ...defaultContextValue, ...contextValue }}>
        <ColorPalette colors={mockColors} {...props} />
      </GridContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the color palette heading', () => {
    renderColorPalette();
    expect(screen.getByText('DMC Colors')).toBeInTheDocument();
  });

  it('renders search input', () => {
    renderColorPalette();
    const searchInput = screen.getByPlaceholderText(/search colors/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('renders all colors when no search term', () => {
    renderColorPalette();
    const colorItems = document.querySelectorAll('.color-item');
    expect(colorItems).toHaveLength(5);
  });

  it('displays color codes', () => {
    renderColorPalette();
    expect(screen.getByText('310')).toBeInTheDocument();
    expect(screen.getByText('666')).toBeInTheDocument();
    expect(screen.getByText('701')).toBeInTheDocument();
    expect(screen.getByText('796')).toBeInTheDocument();
  });

  it('filters colors based on search term', async () => {
    renderColorPalette();
    const searchInput = screen.getByPlaceholderText(/search colors/i);

    await userEvent.type(searchInput, 'red');

    await waitFor(() => {
      const colorItems = document.querySelectorAll('.color-item');
      expect(colorItems).toHaveLength(1); // Only "Bright Red" should match
    });

    expect(screen.getByText('666')).toBeInTheDocument();
    expect(screen.queryByText('310')).not.toBeInTheDocument();
  });

  it('searches by color code', async () => {
    renderColorPalette();
    const searchInput = screen.getByPlaceholderText(/search colors/i);

    await userEvent.type(searchInput, '796');

    await waitFor(() => {
      const colorItems = document.querySelectorAll('.color-item');
      expect(colorItems).toHaveLength(1);
    });

    expect(screen.getByText('796')).toBeInTheDocument();
  });

  it('shows no colors found message when search has no results', async () => {
    renderColorPalette();
    const searchInput = screen.getByPlaceholderText(/search colors/i);

    await userEvent.type(searchInput, 'xyz123');

    await waitFor(() => {
      expect(screen.getByText(/no colors found/i)).toBeInTheDocument();
    });
  });

  it('calls setSelectedColour when a color is clicked', () => {
    renderColorPalette();
    const colorItems = document.querySelectorAll('.color-item');

    fireEvent.click(colorItems[0]); // Click on Black

    expect(mockSetSelectedColour).toHaveBeenCalledWith({
      floss: '310',
      description: 'Black',
      red: 0,
      green: 0,
      blue: 0,
      hex: '000000',
    });
  });

  it('highlights selected color', () => {
    const selectedColor = mockColors[1]; // Bright Red
    renderColorPalette({}, { selectedColour: selectedColor });

    const colorItems = document.querySelectorAll('.color-item');
    expect(colorItems[1]).toHaveClass('selected');
    expect(colorItems[0]).not.toHaveClass('selected');
  });

  it('displays selected color info', () => {
    const selectedColor = mockColors[1]; // Bright Red
    renderColorPalette({}, { selectedColour: selectedColor });

    expect(screen.getByText(/bright red/i)).toBeInTheDocument();
    // Check that DMC 666 appears in the selected color info section
    const selectedInfo = document.querySelector('.selected-color-info');
    expect(selectedInfo).toHaveTextContent('DMC 666');
  });

  it('applies correct color swatches', () => {
    renderColorPalette();
    const swatches = document.querySelectorAll('.color-swatch');

    expect(swatches[0]).toHaveStyle({ backgroundColor: '#000000' });
    expect(swatches[1]).toHaveStyle({ backgroundColor: '#E31D42' });
    expect(swatches[2]).toHaveStyle({ backgroundColor: '#47A72F' });
    expect(swatches[3]).toHaveStyle({ backgroundColor: '#11416D' });
    expect(swatches[4]).toHaveStyle({ backgroundColor: '#FFFFFF' });
  });

  it('handles empty colors array', () => {
    renderColorPalette({ colors: [] });
    expect(screen.getByText(/no colors found/i)).toBeInTheDocument();
  });

  it('handles undefined colors prop', () => {
    renderColorPalette({ colors: undefined });
    expect(screen.getByText(/no colors found/i)).toBeInTheDocument();
  });

  it('case-insensitive search', async () => {
    renderColorPalette();
    const searchInput = screen.getByPlaceholderText(/search colors/i);

    await userEvent.type(searchInput, 'BLACK');

    await waitFor(() => {
      const colorItems = document.querySelectorAll('.color-item');
      expect(colorItems).toHaveLength(1);
    });

    expect(screen.getByText('310')).toBeInTheDocument();
  });

  it('clears search when input is cleared', async () => {
    renderColorPalette();
    const searchInput = screen.getByPlaceholderText(/search colors/i);

    // Type search term
    await userEvent.type(searchInput, 'red');

    await waitFor(() => {
      const colorItems = document.querySelectorAll('.color-item');
      expect(colorItems).toHaveLength(1);
    });

    // Clear search
    await userEvent.clear(searchInput);

    await waitFor(() => {
      const colorItems = document.querySelectorAll('.color-item');
      expect(colorItems).toHaveLength(5); // All colors should be shown again
    });
  });
});
