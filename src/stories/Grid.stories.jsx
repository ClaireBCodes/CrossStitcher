import React from 'react';
import { action } from '@storybook/addon-actions';
import Grid from '../components/Grid';

export default {
  title: 'CrossStitcher/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
  },
};

// Create a mock grid helper function
const createMockGrid = (size = 20, fillPattern = null) => {
  const grid = Array(size).fill().map(() => Array(size).fill(null));
  
  // If a fill pattern is provided, apply it
  if (fillPattern) {
    fillPattern.forEach(({ row, col, color }) => {
      grid[row][col] = color;
    });
  }
  
  return grid;
};

// Sample DMC colors for our stories
const sampleColors = [
  { floss: '310', name: 'Black', hex: '000000' },
  { floss: '817', name: 'Coral Red', hex: 'E24D4D' },
  { floss: '700', name: 'Christmas Green', hex: '07731B' },
  { floss: '796', name: 'Royal Blue', hex: '1B5AAA' },
];

// Base story that all other stories will use
const Template = (args) => <Grid {...args} />;

// Empty grid
export const EmptyGrid = Template.bind({});
EmptyGrid.args = {
  grid: createMockGrid(20),
  onMouseDown: action('mouseDown'),
  onMouseEnter: action('mouseEnter'),
  onMouseUp: action('mouseUp'),
};

// Grid with a simple pattern
export const SimplePattern = Template.bind({});
SimplePattern.args = {
  grid: createMockGrid(20, [
    { row: 5, col: 5, color: sampleColors[0] }, // Black
    { row: 5, col: 6, color: sampleColors[0] },
    { row: 6, col: 5, color: sampleColors[0] },
    { row: 6, col: 6, color: sampleColors[0] },
    { row: 8, col: 8, color: sampleColors[1] }, // Red
    { row: 8, col: 9, color: sampleColors[1] },
    { row: 9, col: 8, color: sampleColors[1] },
    { row: 9, col: 9, color: sampleColors[1] },
  ]),
  onMouseDown: action('mouseDown'),
  onMouseEnter: action('mouseEnter'),
  onMouseUp: action('mouseUp'),
};

// Grid with a cross pattern
export const CrossPattern = Template.bind({});
CrossPattern.args = {
  grid: createMockGrid(20, [
    // Horizontal line
    ...Array(10).fill().map((_, i) => ({ 
      row: 10, 
      col: 5 + i, 
      color: sampleColors[2]  // Green
    })),
    // Vertical line
    ...Array(10).fill().map((_, i) => ({ 
      row: 5 + i, 
      col: 10, 
      color: sampleColors[3]  // Blue
    })),
  ]),
  onMouseDown: action('mouseDown'),
  onMouseEnter: action('mouseEnter'),
  onMouseUp: action('mouseUp'),
};

// Interactive grid example
export const InteractiveExample = () => {
  const [gridState, setGridState] = React.useState(createMockGrid(20));
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(sampleColors[0]);
  
  const handleMouseDown = (row, col) => {
    setIsDrawing(true);
    const newGrid = [...gridState];
    newGrid[row][col] = selectedColor;
    setGridState(newGrid);
  };
  
  const handleMouseEnter = (row, col) => {
    if (!isDrawing) return;
    const newGrid = [...gridState];
    newGrid[row][col] = selectedColor;
    setGridState(newGrid);
  };
  
  const handleMouseUp = () => {
    setIsDrawing(false);
  };
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Select a color:</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {sampleColors.map((color) => (
            <div 
              key={color.floss}
              style={{ 
                width: '30px', 
                height: '30px', 
                backgroundColor: `#${color.hex}`,
                border: selectedColor.floss === color.floss ? '2px solid black' : '1px solid #ddd',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedColor(color)}
              title={color.name}
            />
          ))}
        </div>
        <button 
          style={{ marginTop: '10px' }}
          onClick={() => setGridState(createMockGrid(20))}
        >
          Clear Grid
        </button>
      </div>
      <Grid 
        grid={gridState} 
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseUp={handleMouseUp}
      />
      <div style={{ marginTop: '20px' }}>
        <p>Click and drag to draw on the grid</p>
      </div>
    </div>
  );
};
