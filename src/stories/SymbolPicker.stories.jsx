import React from 'react';
import SymbolPicker from '../components/editor/SymbolPicker';
import { GridProvider } from '../components/GridContext';

// Create a sample grid with multiple colors
const multiColorGrid = (() => {
  const grid = Array(10)
    .fill()
    .map(() => Array(10).fill(null));

  // Add various colors
  const colors = [
    { hex: 'ff0000', floss: '666', name: 'Bright Red' },
    { hex: '00ff00', floss: '700', name: 'Bright Green' },
    { hex: '0000ff', floss: '796', name: 'Royal Blue' },
    { hex: 'ffff00', floss: '307', name: 'Lemon Yellow' },
    { hex: 'ff00ff', floss: '550', name: 'Violet' },
    { hex: '00ffff', floss: '3846', name: 'Light Turquoise' },
    { hex: 'ff8000', floss: '900', name: 'Burnt Orange' },
    { hex: '800080', floss: '552', name: 'Medium Violet' },
  ];

  // Fill grid with colors
  colors.forEach((color, i) => {
    const row = Math.floor(i / 2);
    const col = (i % 2) * 2;
    grid[row][col] = color;
    grid[row][col + 1] = color;
  });

  return grid;
})();

export default {
  title: 'CrossStitcher/SymbolPicker',
  component: SymbolPicker,
  parameters: {
    layout: 'fullscreen',
  },
};

// Default state
export const Default = {
  args: {
    onClose: () => console.log('Close clicked'),
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <GridProvider initialGrid={multiColorGrid}>
        <Story />
      </GridProvider>
    ),
  ],
};

// With no colors
export const EmptyPattern = {
  args: {
    onClose: () => console.log('Close clicked'),
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <GridProvider>
        <Story />
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
The SymbolPicker component provides a modal interface for assigning symbols to colors.

### Features:
- **Two-panel layout**:
  - Left: List of colors in the pattern
  - Right: Grid of available symbols
- **Interactive selection**:
  - Click a color to select it
  - Click a symbol to assign it
- **Visual feedback**:
  - Selected color highlighted
  - Current symbol assignments shown
  - In-use symbols grayed out
- **Smart assignment**:
  - Prevents duplicate symbol use
  - Shows symbol types (shape, letter, number, etc.)

### Workflow:
1. Open modal via "Select symbols" button
2. Click a color from the left panel
3. Choose a symbol from the right panel
4. Symbol is immediately assigned
5. Repeat for other colors
6. Click "Done" to close

### Symbol Categories:
- **Shapes**: ■ ● ▲ ◆ ★ □ ○ △ ◇ ☆
- **Cards**: ♦ ♥ ♠ ♣
- **Math**: + × ÷ = < >
- **ASCII**: # @ & % ! ? $ € £ ¥
- **Numbers**: 0-9
- **Letters**: A-Z, select lowercase

### Usage:
\`\`\`jsx
<SymbolPicker onClose={() => setShowPicker(false)} />
\`\`\`

The component automatically connects to the GridContext for color and symbol management.
        `,
      },
    },
  },
  args: {
    onClose: () => console.log('Close clicked'),
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <GridProvider initialGrid={multiColorGrid}>
        <Story />
      </GridProvider>
    ),
  ],
};
