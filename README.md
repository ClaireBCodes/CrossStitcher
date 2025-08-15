# CrossStitcher

[![Deploy Storybook to GitHub Pages](https://github.com/[username]/CrossStitcher/actions/workflows/deploy-storybook.yml/badge.svg)](https://github.com/[username]/CrossStitcher/actions/workflows/deploy-storybook.yml)
[![Storybook](https://img.shields.io/badge/Storybook-Documentation-FF4785?logo=storybook)](https://[username].github.io/CrossStitcher/)

A web-based cross-stitch pattern designer with advanced features for creating, editing, and exporting cross-stitch patterns.

## 📚 Documentation

View the live component documentation and playground at: **[Storybook Documentation](https://[username].github.io/CrossStitcher/)**

## ✨ Features

- **Pattern Editor**: Interactive grid-based pattern design
- **DMC Color Library**: Complete DMC thread color palette with search
- **Symbol Assignment**: Automatic and custom symbol assignment for pattern clarity
- **Image Import**: Convert images to cross-stitch patterns
- **Multiple Export Formats**: PNG, JSON, CSV export options
- **Undo/Redo**: Full history management
- **Zoom Controls**: Adjustable grid zoom levels
- **Responsive Design**: Dark theme optimized interface

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm 10 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/[username]/CrossStitcher.git
cd CrossStitcher

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run storybook        # Start Storybook development server
npm run build-storybook  # Build Storybook for deployment
npm test                 # Run tests
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
```

## 🧩 Component Architecture

### Core Components

- **CrossStitchEditor**: Main editor interface
- **Grid**: Interactive pattern grid
- **ColorPalette**: DMC color selection
- **SymbolPicker**: Symbol assignment modal
- **ColorLegend**: Symbol chart display

### Utilities

- **patternAnalyzer**: Color usage and symbol assignment
- **imageProcessor**: Image to pattern conversion
- **gridUtils**: Grid manipulation utilities
- **patternExporter**: Export functionality

## 🎨 Storybook

This project uses Storybook for component documentation and testing. Each component has interactive stories demonstrating various states and use cases.

### Running Storybook Locally

```bash
npm run storybook
```

Visit http://localhost:6006 to view the component library.

### Building for Production

```bash
npm run build-storybook
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run with UI
npm run test:ui
```

## 📦 Deployment

### GitHub Pages (Storybook)

The Storybook documentation is automatically deployed to GitHub Pages when changes are pushed to the `master` or `main` branch.

To enable GitHub Pages deployment:

1. Go to Settings → Pages in your GitHub repository
2. Under "Source", select "GitHub Actions"
3. Push to master/main or manually trigger the workflow

## 🛠️ Technology Stack

- **React 19**: UI framework
- **Vite**: Build tool and dev server
- **Vitest**: Testing framework
- **Storybook**: Component documentation
- **React Bootstrap**: UI components
- **GitHub Actions**: CI/CD

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Note**: Replace `[username]` with your GitHub username in the URLs above.
