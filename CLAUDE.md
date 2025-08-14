# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
npm run dev              # Start development server (Vite)
npm run preview          # Preview production build locally
npm run build            # Create production build
```

### Code Quality

```bash
npm run lint             # Run ESLint for code quality checks
npm run lint:fix         # Run ESLint and auto-fix issues
npm run format           # Format all files with Prettier
npm run format:check     # Check if files are formatted correctly
npm test                 # Run tests with Vitest
npm run test:coverage    # Generate test coverage report
```

### Storybook

```bash
npm run storybook        # Start Storybook development server (port 6006)
npm run build-storybook  # Build static Storybook files
```

## Development Workflow

### Pre-commit Hooks

- **Automatic formatting and linting** on staged files via Husky and lint-staged
- Runs Prettier formatting and ESLint fixes before each commit
- Configured in `.husky/pre-commit` and `package.json` (lint-staged)

### Code Formatting

- **Prettier** configuration in `.prettierrc.json`
- Single quotes, trailing commas, 100 char line width
- Format on save recommended in your IDE

### Linting

- **ESLint 9** with React hooks and refresh plugins
- Ignores: `dist/`, `storybook-static/`, `coverage/`, `node_modules/`
- Custom rules for unused variables pattern matching

## Architecture

### Application Structure

CrossStitcher is a React-based cross-stitch pattern editor using:

- **State Management**: React Context API via `GridContext` (src/components/GridContext.jsx) manages grid data, selected color, and selected tool across components
- **Routing**: React Router with pages in src/Pages/ and routes configured in src/Routes/AppRoutes.jsx
- **UI Framework**: Bootstrap 5 with React Bootstrap components for responsive design
- **Build Tool**: Vite for fast development and optimized production builds

### Core Data Flow

1. **GridContext** provides centralized state for the entire editor with undo/redo support
2. **CrossStitchEditor** (src/components/CrossStitchEditor.jsx) orchestrates the main editing interface
3. **Grid** component handles user interactions and renders the pattern grid
4. **ColorPalette** manages DMC thread color selection from src/assets/dmc.json
5. Pattern data can be saved/loaded as JSON files through browser file operations
6. **ImageImport** converts images to patterns using K-means clustering and DMC color matching
7. **PatternExport** exports patterns in multiple formats (PNG, JSON, CSV)

### Key Component Relationships

- Pages (EditorPage, AboutPage, etc.) wrap layout components (HeaderBar, MainBody, FooterBar)
- Editor components (Grid, ColorPalette, Toolbar) consume GridContext for shared state
- Grid cells are rendered as divs with background colors from the grid state array
- Mouse events on Grid cells update the context state based on selected tool (pencil/eraser)

### DMC Color Data

The application uses a comprehensive DMC thread color database at src/assets/dmc.json containing 400+ colors with floss codes, names, RGB, and hex values. This data drives the ColorPalette component's search and selection functionality.

## Recent Improvements

### UI Enhancements

- **Photoshop-style Interface**: Dark sidebar with maximized grid viewport
- **Icon-based Controls**: All tools use Bootstrap Icons with tooltips
- **CSS Variables**: Consistent theming with variables defined in src/styles/theme.css
- **Responsive Accordion**: Organized tool panels in collapsible sections

### New Features

- **Image Import** (src/utils/imageProcessor.js)
  - K-means clustering for color reduction
  - DMC color matching algorithm
  - Configurable pattern dimensions and color limits
- **Pattern Export** (src/utils/patternExporter.js)
  - PNG export with grid and legend
  - JSON format with metadata
  - CSV export for spreadsheets
- **Undo/Redo** (src/hooks/useUndoRedo.js)
  - useReducer-based state management
  - 50-step history buffer
  - Keyboard shortcuts (Ctrl+Z/Y)

### Code Quality

- **Component Extraction**: Modularized editor components in src/components/editor/
- **PropTypes Validation**: Type checking for all component props
- **Constants**: Centralized configuration in src/constants/editor.js
- **Testing**: 30+ unit and integration tests with Vitest
- **Pre-commit Hooks**: Automatic formatting and linting with Husky
