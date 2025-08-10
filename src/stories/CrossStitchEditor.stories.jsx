import React from 'react';
import CrossStitchEditor from '../components/CrossStitchEditor';
import { GridProvider } from '../components/GridContext';

// Mock DMC colors data for stories
const mockDmcColors = [
  { floss: '310', name: 'Black', hex: '000000' },
  { floss: 'B5200', name: 'Snow White', hex: 'FFFFFF' },
  { floss: '817', name: 'Coral Red', hex: 'E24D4D' },
  { floss: '666', name: 'Bright Red', hex: 'E31E24' },
  { floss: '700', name: 'Christmas Green', hex: '07731B' },
  { floss: '3348', name: 'Yellow Green', hex: 'C0CA33' },
  { floss: '3846', name: 'Turquoise', hex: '06A9CC' },
  { floss: '796', name: 'Royal Blue', hex: '1B5AAA' },
  { floss: '554', name: 'Light Violet', hex: 'A992D9' },
  { floss: '550', name: 'Violet', hex: '5C3E8C' },
];

// Mock the fetch call that loads DMC colors without using Jest
const originalFetch = window.fetch;
window.fetch = (url) => {
  return Promise.resolve({
    json: () => Promise.resolve(mockDmcColors),
  });
};

export default {
  title: 'CrossStitcher/CrossStitchEditor',
  component: CrossStitchEditor,
  parameters: {
    layout: 'fullscreen',
    // Disable default padding to show the editor at full size
    layout: {
      fullscreen: true,
      padding: 0,
    },
    // This will make the stories not interfere with each other's state
    componentToggle: { disable: true },
  },
};

// Create a wrapper component to handle fetch cleanup
const StoryWrapper = ({ children }) => {
  React.useEffect(() => {
    // Cleanup function to restore original fetch when component unmounts
    return () => {
      window.fetch = originalFetch;
    };
  }, []);
  
  return <>{children}</>;
};

// Basic editor with default settings
export const DefaultEditor = () => (
  <StoryWrapper>
    <GridProvider>
      <CrossStitchEditor colours={mockDmcColors} />
    </GridProvider>
  </StoryWrapper>
);

// Editor with a pre-defined pattern
export const EditorWithPattern = () => {
  const coral = { floss: '817', name: 'Coral Red', hex: 'E24D4D' }
  const red = { floss: '666', name: 'Bright Red', hex: 'E31E24' }
  const white = { floss: 'B5200', name: 'Snow White', hex: 'FFFFFF' }

  const toColour = (row) => {
    return row.map((cell) => {
      switch (cell) {
        case 1: return coral;
        case 2: return red;
        case 3: return white;
        default: return null; // Default / 0 to no color
      }
    });
  }

  // Create a simple pattern - a heart shape
  const heart = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,2,2,0,0,0,2,2,0,0,0],
    [0,0,2,1,1,2,0,2,1,1,2,0,0],
    [0,2,1,1,1,1,2,1,1,3,1,2,0],
    [0,2,1,1,1,1,1,1,1,1,1,2,0],
    [0,0,2,1,1,1,1,1,1,1,2,0,0],
    [0,0,0,2,1,1,1,1,1,2,0,0,0],
    [0,0,0,0,2,1,1,1,2,0,0,0,0],
    [0,0,0,0,0,2,1,2,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
  ].map(toColour)

  return (
    <StoryWrapper>
      <GridProvider initialGrid={heart}>
        <CrossStitchEditor colours={mockDmcColors}/>
      </GridProvider>
    </StoryWrapper>
  );
};

// Editor in "Erase Mode"
export const EditorInEraseMode = () => {
  React.useEffect(() => {
    // Switch to eraser tool after component mounts
    setTimeout(() => {
      const eraserButton = document.querySelector('.tool-button:nth-child(2)');
      if (eraserButton) {
        eraserButton.click();
      }
    }, 300);
  }, []);
  
  return (
    <StoryWrapper>
      <GridProvider>
        <CrossStitchEditor colours={mockDmcColors} />
      </GridProvider>
    </StoryWrapper>
  );
};

// Mobile View
export const MobileView = () => (
  <StoryWrapper>
    <GridProvider>
      <CrossStitchEditor />
    </GridProvider>
  </StoryWrapper>
);

MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
