import React from 'react';
import ZoomControls from '../components/editor/ZoomControls';
import { GridProvider } from '../components/GridContext';

export default {
  title: 'CrossStitcher/ZoomControls',
  component: ZoomControls,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ width: '250px', padding: '20px', background: '#2d2d30' }}>
        <GridProvider>
          <Story />
        </GridProvider>
      </div>
    ),
  ],
};

// Default zoom level (100%)
export const Default = {};

// Zoomed in
export const ZoomedIn = {
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ width: '250px', padding: '20px', background: '#2d2d30' }}>
        <GridProvider>
          <div>
            <p style={{ color: 'white', fontSize: '12px', marginBottom: '10px' }}>
              Click + to zoom in
            </p>
            <Story />
          </div>
        </GridProvider>
      </div>
    ),
  ],
};

// Zoomed out
export const ZoomedOut = {
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ width: '250px', padding: '20px', background: '#2d2d30' }}>
        <GridProvider>
          <div>
            <p style={{ color: 'white', fontSize: '12px', marginBottom: '10px' }}>
              Click - to zoom out
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
The ZoomControls component provides zoom functionality for the pattern grid.

### Features:
- Zoom in (Ctrl/Cmd + Plus)
- Zoom out (Ctrl/Cmd + Minus)
- Reset to 100% zoom
- Fit to screen
- Current zoom level display
- Keyboard shortcut support

### Zoom Levels:
- Minimum: 25%
- Maximum: 400%
- Default: 100%
- Step: 25%

### Usage:
\`\`\`jsx
<ZoomControls />
\`\`\`

The component automatically connects to the GridContext to manage zoom state.

### Keyboard Shortcuts:
- **Zoom In**: Ctrl/Cmd + Plus (+)
- **Zoom Out**: Ctrl/Cmd + Minus (-)
- **Reset**: Ctrl/Cmd + 0
        `,
      },
    },
  },
};
