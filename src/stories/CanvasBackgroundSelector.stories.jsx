import React from 'react';
import CanvasBackgroundSelector from '../components/editor/CanvasBackgroundSelector';
import { GridProvider } from '../components/GridContext';

export default {
  title: 'CrossStitcher/CanvasBackgroundSelector',
  component: CanvasBackgroundSelector,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ width: '300px', padding: '20px', background: '#2d2d30' }}>
        <GridProvider>
          <Story />
        </GridProvider>
      </div>
    ),
  ],
};

// Default state
export const Default = {};

// With custom color selected
export const CustomColor = {
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ width: '300px', padding: '20px', background: '#2d2d30' }}>
        <GridProvider>
          <div>
            <p style={{ color: 'white', fontSize: '12px', marginBottom: '10px' }}>
              Use the color picker to select a custom background
            </p>
            <Story />
          </div>
        </GridProvider>
      </div>
    ),
  ],
};

// Documentation
export const Documentation = {
  parameters: {
    docs: {
      description: {
        story: `
The CanvasBackgroundSelector component allows users to change the background color of empty grid cells.

### Features:
- Preset color options (White, Light Gray, Black)
- Custom color picker
- Real-time preview
- Affects only empty cells (null values)

### Preset Colors:
- **White** (#ffffff): Default, best for most patterns
- **Light Gray** (#e0e0e0): Good for white thread visibility
- **Black** (#1a1a1a): High contrast for light colors
- **Custom**: Any color via color picker

### Usage:
\`\`\`jsx
<CanvasBackgroundSelector />
\`\`\`

The component automatically connects to the GridContext to manage the canvas background color.

### Use Cases:
- Improve visibility of light-colored threads
- Match fabric color for realistic preview
- High contrast for accessibility
- Personal preference
        `,
      },
    },
  },
};
