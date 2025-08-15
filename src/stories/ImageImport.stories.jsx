import React from 'react';
import ImageImport from '../components/editor/ImageImport';
import { GridProvider } from '../components/GridContext';

export default {
  title: 'CrossStitcher/ImageImport',
  component: ImageImport,
  parameters: {
    layout: 'centered',
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

// Default state - modal open
export const Default = {
  args: {
    onClose: () => console.log('Close clicked'),
  },
};

// With a mock file already selected (would need to mock the file input)
export const Processing = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <ImageImport onClose={() => console.log('Close clicked')} />
    </div>
  );
};

// Error state
export const WithError = () => {
  // This would show the error state
  // In practice, you'd need to trigger an error by selecting an invalid file
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <ImageImport onClose={() => console.log('Close clicked')} />
    </div>
  );
};

// Documentation
export const Documentation = {
  parameters: {
    docs: {
      description: {
        story: `
The ImageImport component allows users to:
- Import images and convert them to cross-stitch patterns
- Import existing JSON pattern files
- Configure pattern dimensions and color limits
- Maintain aspect ratio when importing images

### Features:
- Supports common image formats (PNG, JPG, GIF, etc.)
- K-means clustering for color reduction
- DMC color matching
- Configurable grid dimensions
- JSON pattern file support

### Usage:
\`\`\`jsx
<ImageImport 
  onClose={() => setShowImport(false)} 
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
