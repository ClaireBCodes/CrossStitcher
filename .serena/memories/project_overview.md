# CrossStitcher Project Overview

## Purpose

CrossStitcher is a web-based cross-stitch pattern editor application that allows users to:

- Create and edit cross-stitch patterns on a customizable grid
- Import images and convert them to patterns with K-means color reduction
- Export patterns in multiple formats (PNG, JSON, CSV)
- Use the DMC thread color palette (400+ colors)
- Save and load patterns with metadata

## Tech Stack

- **Frontend Framework**: React 19 with React Router
- **Build Tool**: Vite 6
- **UI Framework**: Bootstrap 5 + React Bootstrap
- **State Management**: React Context API
- **Testing**: Vitest, React Testing Library, Storybook
- **Linting**: ESLint 9
- **Icons**: Bootstrap Icons
- **Type Checking**: PropTypes

## Project Structure

- `/src/components/` - React components (Grid, ColorPalette, etc.)
- `/src/components/editor/` - Editor-specific components (ImageImport, PatternExport, etc.)
- `/src/hooks/` - Custom React hooks (useUndoRedo)
- `/src/utils/` - Utility functions (imageProcessor, patternExporter, drawingTools)
- `/src/Pages/` - Page components for routing
- `/src/Routes/` - Route configurations
- `/src/assets/` - Static assets and DMC color database
- `/src/stories/` - Storybook stories for component development
- `/src/constants/` - Application constants
- `/src/styles/` - Global styles and themes

## Key Features

- Photoshop-like dark sidebar UI
- Undo/redo functionality with useReducer
- Image import with DMC color matching
- Multi-format export with canvas rendering
- Responsive grid with zoom controls
- File operations (save/load patterns)
- CSS variables for theming
