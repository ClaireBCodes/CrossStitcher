import React from 'react';
import PatternExport from '../components/editor/PatternExport';
import { GridProvider } from '../components/GridContext';

// Create a sample pattern for testing
const samplePattern = [
  [
    { hex: 'ff0000', name: 'Red', floss: '666' },
    { hex: '00ff00', name: 'Green', floss: '700' },
    null,
  ],
  [
    null,
    { hex: '0000ff', name: 'Blue', floss: '796' },
    { hex: 'ffff00', name: 'Yellow', floss: '307' },
  ],
  [
    { hex: 'ff00ff', name: 'Magenta', floss: '550' },
    null,
    { hex: '00ffff', name: 'Cyan', floss: '3846' },
  ],
];

export default {
  title: 'CrossStitcher/PatternExport',
  component: PatternExport,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <GridProvider initialGrid={samplePattern}>
        <Story />
      </GridProvider>
    ),
  ],
};

// Default state - modal open
export const Default = {
  args: {
    onClose: () => console.log('Close clicked'),
  },
};

// PNG export selected
export const PNGExport = {
  args: {
    onClose: () => console.log('Close clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the PNG export option selected with image-specific settings',
      },
    },
  },
};

// JSON export selected
export const JSONExport = {
  args: {
    onClose: () => console.log('Close clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the JSON export option for saving pattern data',
      },
    },
  },
};

// CSV export selected
export const CSVExport = {
  args: {
    onClose: () => console.log('Close clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the CSV export option for spreadsheet compatibility',
      },
    },
  },
};

// Documentation
export const Documentation = {
  parameters: {
    docs: {
      description: {
        story: `
The PatternExport component allows users to export their cross-stitch patterns in various formats.

### Supported Formats:
- **PNG**: High-quality image with optional grid and legend
- **PDF**: Printable format (currently exports as high-res PNG)
- **JSON**: Pattern data with metadata for re-importing
- **CSV**: Spreadsheet format for external tools

### Features:
- Customizable filename
- Format-specific options (grid, legend, cell size for images)
- Automatic download on export
- Progress indication during export

### Usage:
\`\`\`jsx
<PatternExport 
  onClose={() => setShowExport(false)} 
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onClose: () => console.log('Close clicked'),
  },
};
