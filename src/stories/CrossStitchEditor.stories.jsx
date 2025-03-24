import React from 'react';
import CrossStitchEditor from '../components/CrossStitchEditor';

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
    <CrossStitchEditor />
  </StoryWrapper>
);

// Editor with a pre-defined pattern
export const EditorWithPattern = () => {
  // Override the useEffect and useState hooks to start with a pre-filled grid
  React.useEffect(() => {
    // Inject a pattern after component mounts
    setTimeout(() => {
      // This is a hacky way to access the grid state - in a real application, 
      // you'd have better patterns for this, but for Storybook it works
      const gridCells = document.querySelectorAll('.grid-cell');
      
      // Create a simple pattern - a heart shape
      const heart = [
        [5, 10], [5, 11], [6, 9], [6, 12], 
        [7, 8], [7, 13], [8, 8], [8, 13],
        [9, 9], [9, 12], [10, 10], [10, 11]
      ];
      
      // Apply the pattern (red color)
      heart.forEach(([row, col]) => {
        const index = row * 100 + col; // Assuming 100x100 grid
        if (gridCells[index]) {
          const event = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          gridCells[index].dispatchEvent(event);
        }
      });
    }, 500); // Wait a bit for the component to mount and initialize
    
    // Mock color selection
    setTimeout(() => {
      const colorItems = document.querySelectorAll('.color-item');
      colorItems.forEach(item => {
        if (item.textContent.includes('817')) { // Coral Red
          item.click();
          return;
        }
      });
    }, 300);
  }, []);
  
  return (
    <StoryWrapper>
      <CrossStitchEditor />
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
      <CrossStitchEditor />
    </StoryWrapper>
  );
};

// Mobile View
export const MobileView = () => (
  <StoryWrapper>
    <CrossStitchEditor />
  </StoryWrapper>
);

MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
