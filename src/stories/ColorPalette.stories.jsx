import React from 'react';
import ColorPalette from '../components/ColorPalette';
import { GridProvider } from '../components/GridContext';

// Mock DMC color data
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

export default {
  title: 'Components/ColorPalette',
  component: ColorPalette,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSelectColor: { action: 'color selected' },
  },
  render: (args) => {
    const {selectedColor, ...rest} = args;

    return (
      <GridProvider initialSelectedColour={selectedColor}>
        <ColorPalette {...rest} />
      </GridProvider>
    )
  }
};

// Default state with no selection
export const Default = {
  args: {
    colors: mockDmcColors,
    selectedColor: null,
  }
};

// With a color selected
export const WithSelectedColor = {
  args: {
    colors: mockDmcColors,
    selectedColor: mockDmcColors[2], // Coral Red is selected
  },
};

// Empty state (no colors)
export const EmptyState = {
  args: {
    colors: [],
    selectedColor: null,
  },
};

// With search results
export const SearchResults = () => {
    // Mock a component that has the search term pre-applied
  const [searchTerm, setSearchTerm] = React.useState('blue');
  
  // Filter colors that match the search term
  const filteredColors = mockDmcColors.filter(color => 
    color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    color.floss.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <GridProvider>
      <div style={{ width: '300px' }}>
        <h3>Searching for: "{searchTerm}"</h3>
        <ColorPalette 
          colors={filteredColors}
          selectedColor={null}
          onSelectColor={() => {}}
        />
        <button onClick={() => setSearchTerm('')} style={{ marginTop: '10px' }}>
          Clear Search
        </button>
      </div>
    </GridProvider>
  );
};

// Responsive view
export const ResponsiveView = {
  render: (args) => (
    <GridProvider>
      <div style={{ width: '100%', maxWidth: '800px', resize: 'horizontal', overflow: 'auto', border: '1px dashed gray' }}>
        <p>Resize this container to see how the component responds:</p>
        <ColorPalette {...args} />
      </div>
    </GridProvider>
  ),
  args: {
    colors: mockDmcColors,
    selectedColor: null,
  },
};

