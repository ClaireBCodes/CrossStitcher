# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev              # Start development server (Vite)
npm run preview          # Preview production build locally
npm run build            # Create production build
npm run lint             # Run ESLint for code quality checks
```

### Storybook
```bash
npm run storybook        # Start Storybook development server (port 6006)
npm run build-storybook  # Build static Storybook files
```

## Architecture

### Application Structure
CrossStitcher is a React-based cross-stitch pattern editor using:
- **State Management**: React Context API via `GridContext` (src/components/GridContext.jsx) manages grid data, selected color, and selected tool across components
- **Routing**: React Router with pages in src/Pages/ and routes configured in src/Routes/AppRoutes.jsx
- **UI Framework**: Bootstrap 5 with React Bootstrap components for responsive design
- **Build Tool**: Vite for fast development and optimized production builds

### Core Data Flow
1. **GridContext** provides centralized state for the entire editor
2. **CrossStitchEditor** (src/components/CrossStitchEditor.jsx) orchestrates the main editing interface
3. **Grid** component handles user interactions and renders the pattern grid
4. **ColorPalette** manages DMC thread color selection from src/assets/dmc.json
5. Pattern data can be saved/loaded as JSON files through browser file operations

### Key Component Relationships
- Pages (EditorPage, AboutPage, etc.) wrap layout components (HeaderBar, MainBody, FooterBar)
- Editor components (Grid, ColorPalette, Toolbar) consume GridContext for shared state
- Grid cells are rendered as divs with background colors from the grid state array
- Mouse events on Grid cells update the context state based on selected tool (pencil/eraser)

### DMC Color Data
The application uses a comprehensive DMC thread color database at src/assets/dmc.json containing 400+ colors with floss codes, names, RGB, and hex values. This data drives the ColorPalette component's search and selection functionality.