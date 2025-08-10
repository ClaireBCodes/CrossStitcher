import React from 'react';
import { action } from '@storybook/addon-actions';
import Toolbar from '../components/Toolbar';
import { GridContext, GridProvider } from '../components/GridContext';

export default {
  title: 'CrossStitcher/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currentTool: { control: 'text' },
    clearGrid: { action: 'grid cleared' },
    savePattern: { action: 'pattern saved' },
  },
};

// Template for creating stories
const Template = (args) => {
  const {currentTool, ...rest} = args;
  return (
    <GridProvider initialSelectedTool={currentTool}>
      <Toolbar {...rest} />
    </GridProvider>

  )
};

// Default state with pencil tool selected
export const PencilSelected = Template.bind({});
PencilSelected.args = {
  currentTool: 'pencil',  
  clearGrid: action('grid cleared'),
  savePattern: action('pattern saved'),
};

// State with eraser tool selected
export const EraserSelected = Template.bind({});
EraserSelected.args = {
  currentTool: 'eraser',
  clearGrid: action('grid cleared'),
  savePattern: action('pattern saved'),
};

// Interactive state where user can switch between tools
export const Interactive = () => {
  const [selectedTool, setSelectedTool] = React.useState('pencil');
  
  const handleClearGrid = () => {
    // In a real implementation, this would clear the grid
    // For this story, we'll just show an alert
    action('grid cleared')();
    alert('Grid would be cleared in the real app');
  };
  
  const handleSavePattern = () => {
    // In a real implementation, this would trigger pattern saving
    // For this story, we'll just show an alert
    action('pattern saved')();
    alert('Pattern would be saved in the real app');
  };

  
  return (
    <GridContext.Provider value={{selectedTool, setSelectedTool}}>
      <div style={{ width: '300px' }}>
        <h3>Current Tool: {selectedTool}</h3>
        <Toolbar
          
          clearGrid={handleClearGrid}
          savePattern={handleSavePattern}
        />
        <div style={{ marginTop: '20px' }}>
          <p>Click on the buttons above to change tools or trigger actions.</p>
          <p>The "Clear All" button will display a confirmation dialog.</p>
        </div>
      </div>
    </GridContext.Provider>
  );
};

// Mobile view to show responsive behavior
export const MobileView = Template.bind({});
MobileView.args = {
  currentTool: 'pencil',
  clearGrid: action('grid cleared'),
  savePattern: action('pattern saved'),
};
MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
