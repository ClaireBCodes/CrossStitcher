# Task Completion Checklist

When completing a development task, ensure you:

## Before Committing

1. **Run linting**: `npm run lint`
   - Fix any ESLint errors or warnings
   - Ensure code follows project conventions

2. **Run tests**: `npm test`
   - Verify all tests pass
   - Add tests for new functionality
   - Update tests for modified code

3. **Test manually**: `npm run dev`
   - Verify the feature works as expected
   - Check for console errors
   - Test edge cases

4. **Check Storybook**: `npm run storybook`
   - Update stories if component props changed
   - Add stories for new components

## Code Review Checklist

- [ ] PropTypes added for all component props
- [ ] No console.log statements left
- [ ] Accessibility attributes added (ARIA labels)
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Memory leaks prevented (cleanup in useEffect)
- [ ] CSS variables used for colors/spacing
- [ ] Constants extracted (no magic numbers)

## Git Commit

- Use meaningful commit messages
- Follow conventional format: `type: description`
- Types: feat, fix, refactor, docs, test, chore
- Include Co-Authored-By for Claude-generated code

## Documentation

- Update CLAUDE.md if architecture changes
- Update README.md for new features
- Add JSDoc comments for utility functions
- Document complex logic with inline comments
