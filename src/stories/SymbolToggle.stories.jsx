import React from 'react';
import SymbolToggle from '../components/editor/SymbolToggle';
import { GridProvider } from '../components/GridContext';

export default {
  title: 'CrossStitcher/SymbolToggle',
  component: SymbolToggle,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ width: '200px', padding: '20px', background: '#2d2d30' }}>
        <GridProvider>
          <Story />
        </GridProvider>
      </div>
    ),
  ],
};

// Default state - off
export const Default = {};

// Toggled on state
export const ToggledOn = {
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ width: '200px', padding: '20px', background: '#2d2d30' }}>
        <GridProvider>
          <div>
            <p style={{ color: 'white', fontSize: '12px', marginBottom: '10px' }}>
              Click to toggle symbols on/off
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
The SymbolToggle component provides a switch to show/hide symbols on the pattern grid.

### Features:
- Toggle switch with visual feedback
- Shows current state (on/off)
- Smooth transition animations
- Accessible label

### States:
- **Off (default)**: Symbols hidden on grid
- **On**: Symbols displayed on colored cells

### Usage:
\`\`\`jsx
<SymbolToggle />
\`\`\`

The component automatically connects to the GridContext to manage symbol visibility.

### Effect on Grid:
When enabled, each colored cell in the pattern grid displays its assigned symbol.
Symbols are overlaid on the color with appropriate contrast for visibility.
        `,
      },
    },
  },
};
