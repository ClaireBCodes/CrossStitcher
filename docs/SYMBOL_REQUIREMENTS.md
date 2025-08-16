# Cross-Stitch Symbol Requirements

## Overview

Cross-stitch patterns use unique symbols to differentiate between similar colors when stitching. This document outlines the requirements for implementing symbol functionality in the CrossStitcher application.

## Symbol Data Source

- Symbol list available at: `src/assets/symbol-list`
- This will be used as the source for available symbols

## Feature Requirements

### 1. Symbol Toggle in Editor

- **Requirement**: Users should be able to toggle symbols on/off in the pattern editor
- **Behavior**:
  - When ON: Display symbols overlaid on colored grid cells
  - When OFF: Display only the colors (current behavior)
- **UI Location**: Add toggle control in the editor toolbar/settings

### 2. Symbol-to-Color Assignment

- **Requirement**: Users can assign specific symbols to colors used in the pattern
- **Scope**: Only colors actually used in the current pattern
- **Behavior**:
  - Provide interface to pick/choose symbol assignments
  - Auto-assign sensible defaults if user doesn't choose
  - Assignments should persist with the pattern
- **Default Assignment Strategy**:
  - Assign symbols in order of symbol list
  - Most used colors get simpler/clearer symbols

### 3. Used Colors Display

- **Requirement**: Show users which colors are currently in use in the pattern
- **Information to Display**:
  - Color swatch
  - DMC floss code
  - Color name
  - Number of stitches/cells using this color
  - Assigned symbol
- **Updates**: Should update in real-time as pattern changes

### 4. Symbol-Color Mapping Legend

- **Requirement**: Visual component showing symbol-to-color mappings
- **Display Format**:
  - Symbol | Color Swatch | DMC Code | Color Name | Stitch Count
- **Use Cases**:
  - Reference while editing
  - Include in pattern exports
  - Print-friendly version for stitchers

## Technical Considerations

### Data Structure

- Need to track symbol assignments in pattern state
- Consider storing as part of pattern metadata
- Structure: `{ colorKey: { symbol: 'X', dmcCode: '666', name: 'Red', hex: '#ff0000', count: 42 } }`

### Performance

- Symbol rendering on grid should be efficient
- Consider caching symbol assignments
- Update counts efficiently when pattern changes

### Export Formats

- Include symbol legend in pattern exports (PNG, PDF)
- Save symbol assignments in JSON pattern files
- Ensure symbols are readable at different zoom levels

## Implementation Priority

1. Load and parse symbol list
2. Track used colors in pattern
3. Create symbol assignment logic with defaults
4. Implement symbol toggle on grid
5. Create symbol assignment UI
6. Build symbol-color legend component
7. Integrate with export functionality

## User Experience Goals

- Symbols should be clearly visible and distinguishable
- Assignment interface should be intuitive
- Defaults should work well without user intervention
- Symbol display should not clutter the editing experience
