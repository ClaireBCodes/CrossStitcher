import React from 'react';
import GridSizeControls from '../components/editor/GridSizeControls';
import { GridProvider } from '../components/GridContext';

export default {
  title: 'CrossStitcher/GridSizeControls',
  component: GridSizeControls,
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

// Small grid
export const SmallGrid = {
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ width: '300px', padding: '20px', background: '#2d2d30' }}>
        <GridProvider
          initialGrid={Array(20)
            .fill()
            .map(() => Array(20).fill(null))}
        >
          <Story />
        </GridProvider>
      </div>
    ),
  ],
};

// Large grid
export const LargeGrid = {
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ width: '300px', padding: '20px', background: '#2d2d30' }}>
        <GridProvider
          initialGrid={Array(100)
            .fill()
            .map(() => Array(100).fill(null))}
        >
          <Story />
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
The GridSizeControls component allows users to resize the cross-stitch pattern grid.

### Features:
- Adjustable width and height
- Min size: 5x5
- Max size: 200x200
- Default: 50x50
- Apply button to confirm changes
- Warning dialog before applying (clears undo history)

### Important Notes:
- Changing grid size will clear the undo/redo history
- Existing pattern data may be lost if reducing size
- Grid expands with null (empty) cells when increasing size

### Usage:
\`\`\`jsx
<GridSizeControls />
\`\`\`

The component automatically connects to the GridContext to manage grid dimensions.
        `,
      },
    },
  },
};
