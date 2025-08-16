# Code Style and Conventions

## Naming Conventions

- **Components**: PascalCase (e.g., `CrossStitchEditor`, `ColorPalette`)
- **Files**: Component files use PascalCase.jsx, utilities use camelCase.js
- **Constants**: UPPER_SNAKE_CASE (e.g., `GRID_CONFIG`, `TOOLS`)
- **Hooks**: Start with 'use' prefix (e.g., `useUndoRedo`)
- **CSS Classes**: kebab-case (e.g., `cross-stitch-editor`, `color-palette`)

## React Patterns

- Functional components with hooks (no class components)
- PropTypes for type checking (not TypeScript)
- Context API for state management (GridContext)
- Custom hooks for reusable logic
- Destructuring props and context values

## Code Organization

- One component per file
- Related components grouped in directories (e.g., `/editor/`)
- Styles co-located with components (.css files)
- Tests in `__tests__` directories
- Stories alongside component files

## CSS Patterns

- CSS variables for theming (defined in theme.css)
- Bootstrap utilities for common styles
- Component-specific CSS files
- Dark theme with sidebar layout

## Testing

- Vitest for unit tests
- React Testing Library for component tests
- Test files named `*.test.js` or `*.test.jsx`
- Integration tests for complex interactions
- Storybook for visual component development

## Best Practices

- Extract constants to `/constants/` directory
- Use semantic HTML elements
- Add ARIA labels for accessibility
- Include tooltips for icon-only buttons
- Validate user inputs before processing
- Clean up resources (URLs, event listeners)
