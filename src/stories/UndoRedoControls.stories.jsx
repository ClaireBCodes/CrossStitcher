import React from 'react';
import UndoRedoControls from '../components/editor/UndoRedoControls';
import { GridProvider } from '../components/GridContext';

export default {
  title: 'CrossStitcher/UndoRedoControls',
  component: UndoRedoControls,
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

// Default state - both disabled
export const BothDisabled = {};

// With undo history available
export const UndoEnabled = {
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ width: '200px', padding: '20px', background: '#2d2d30' }}>
        <GridProvider>
          <div>
            <p style={{ color: 'white', fontSize: '12px', marginBottom: '10px' }}>
              (Make a change to enable undo)
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
The UndoRedoControls component provides undo and redo functionality for the pattern editor.

### Features:
- Undo last action (Ctrl/Cmd + Z)
- Redo last undone action (Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z)
- Visual feedback for enabled/disabled states
- Keyboard shortcut support
- 50-step history buffer

### States:
- **Disabled**: No history available (grayed out)
- **Enabled**: History available (clickable)
- **Hover**: Visual feedback on hover

### Usage:
\`\`\`jsx
<UndoRedoControls />
\`\`\`

The component automatically connects to the GridContext to manage undo/redo state.
        `,
      },
    },
  },
};
