import React from 'react';
import ColorLegend from '../components/editor/ColorLegend';
import { GridProvider } from '../components/GridContext';

// Create sample grids with different patterns
const emptyGrid = Array(10)
  .fill()
  .map(() => Array(10).fill(null));

const singleColorGrid = Array(10)
  .fill()
  .map(() => Array(10).fill({ hex: 'ff0000', floss: '666', name: 'Red' }));

const multiColorGrid = (() => {
  const grid = Array(10)
    .fill()
    .map(() => Array(10).fill(null));

  // Add some colors
  grid[0][0] = { hex: 'ff0000', floss: '666', name: 'Red' };
  grid[0][1] = { hex: 'ff0000', floss: '666', name: 'Red' };
  grid[1][0] = { hex: '00ff00', floss: '700', name: 'Green' };
  grid[1][1] = { hex: '0000ff', floss: '796', name: 'Blue' };
  grid[2][0] = { hex: 'ffff00', floss: '307', name: 'Yellow' };
  grid[2][1] = { hex: 'ffff00', floss: '307', name: 'Yellow' };
  grid[2][2] = { hex: 'ffff00', floss: '307', name: 'Yellow' };
  grid[3][0] = { hex: 'ff00ff', floss: '550', name: 'Magenta' };

  return grid;
})();

export default {
  title: 'CrossStitcher/ColorLegend',
  component: ColorLegend,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ width: '400px', padding: '20px', background: '#1e1e1e' }}>
        <Story />
      </div>
    ),
  ],
};

// Empty pattern
export const EmptyPattern = {
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <GridProvider initialGrid={emptyGrid}>
        <div style={{ width: '400px', padding: '20px', background: '#1e1e1e' }}>
          <Story />
        </div>
      </GridProvider>
    ),
  ],
};

// Single color pattern
export const SingleColor = {
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <GridProvider initialGrid={singleColorGrid}>
        <div style={{ width: '400px', padding: '20px', background: '#1e1e1e' }}>
          <Story />
        </div>
      </GridProvider>
    ),
  ],
};

// Multiple colors pattern
export const MultipleColors = {
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <GridProvider initialGrid={multiColorGrid}>
        <div style={{ width: '400px', padding: '20px', background: '#1e1e1e' }}>
          <Story />
        </div>
      </GridProvider>
    ),
  ],
};

// With symbols shown
export const WithSymbolsShown = {
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <GridProvider initialGrid={multiColorGrid}>
        <div style={{ width: '400px', padding: '20px', background: '#1e1e1e' }}>
          <p style={{ color: 'white', fontSize: '12px', marginBottom: '10px' }}>
            Turn on "Show Symbols" below, then expand the Symbol chart
          </p>
          <Story />
        </div>
      </GridProvider>
    ),
  ],
};

// Documentation
export const Documentation = {
  parameters: {
    docs: {
      description: {
        story: `
The ColorLegend component (Symbol chart) displays all colors currently used in the pattern.

### Features:
- Collapsible interface (click header to expand/collapse)
- Shows color count badge in header
- Displays each color with:
  - Assigned symbol (when symbols are shown)
  - Color swatch
  - DMC floss code
  - Color name
  - Stitch count
- "Select symbols" button opens symbol picker modal
- Automatically updates as pattern changes

### Symbol Assignment:
- Click "Select symbols" to open the symbol picker
- Select a color from the left panel
- Choose a symbol from the right panel
- Symbols are automatically assigned by usage frequency
- Most-used colors get simpler symbols

### Usage:
\`\`\`jsx
<ColorLegend />
\`\`\`

The component automatically connects to the GridContext to track colors and symbols.
        `,
      },
    },
  },
};
