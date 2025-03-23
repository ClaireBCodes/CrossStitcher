import React from 'react';
import { action } from '@storybook/addon-actions';
import Toolbar from '../components/Toolbar';

export default {
  title: 'CrossStitcher/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    setCurrentTool: { action: 'tool changed' },
    clearGrid: { action: 'grid cleared' },
    savePattern: { action: 'pattern saved' },
  },
};

// Template for creating stories
const Template = (args) => <Toolbar {...args} />;

// Default state with pencil tool selected
export const PencilSelected = Template.bind({});
PencilSelected.args = {
  currentTool: 'pencil',
  setCurrentTool: action('tool changed'),
  clearGrid: action('grid cleared'),
  savePattern: action('pattern saved'),
};

// State with eraser tool selected
export const EraserSelected = Template.bind({});
EraserSelected.args = {
  currentTool: 'eraser',
  setCurrentTool: action('tool changed'),
  clearGrid: action('grid cleared'),
  savePattern: action('pattern saved'),
};

// Interactive state where user can switch between tools
export const Interactive = () => {
  const [currentTool, setCurrentTool] = React.useState('pencil');
  
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
    <div style={{ width: '300px' }}>
      <h3>Current Tool: {currentTool}</h3>
      <Toolbar
        currentTool={currentTool}
        setCurrentTool={setCurrentTool}
        clearGrid={handleClearGrid}
        savePattern={handleSavePattern}
      />
      <div style={{ marginTop: '20px' }}>
        <p>Click on the buttons above to change tools or trigger actions.</p>
        <p>The "Clear All" button will display a confirmation dialog.</p>
      </div>
    </div>
  );
};

// Mobile view to show responsive behavior
export const MobileView = Template.bind({});
MobileView.args = {
  currentTool: 'pencil',
  setCurrentTool: action('tool changed'),
  clearGrid: action('grid cleared'),
  savePattern: action('pattern saved'),
};
MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
