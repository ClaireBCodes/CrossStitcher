import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import ColorPalette from './ColorPalette';
import Toolbar from './Toolbar';
import './CrossStitchEditor.css';
import { GridContext } from './GridContext';
import Accordion from 'react-bootstrap/Accordion';

// Extracted components
import UndoRedoControls from './editor/UndoRedoControls';
import ZoomControls from './editor/ZoomControls';
import GridSizeControls from './editor/GridSizeControls';
import CanvasBackgroundSelector from './editor/CanvasBackgroundSelector';
import ImageImport from './editor/ImageImport';
import PatternExport from './editor/PatternExport';
import SymbolToggle from './editor/SymbolToggle';
import ColorLegend from './editor/ColorLegend';

const CrossStitchEditor = ({ colours = [] }) => {
  const { grid, setGrid } = useContext(GridContext);
  const [showImageImport, setShowImageImport] = useState(false);
  const [showPatternExport, setShowPatternExport] = useState(false);

  // Clear the entire grid
  const clearGrid = () => {
    const currentHeight = grid.length;
    const currentWidth = grid[0]?.length || 50;
    setGrid(
      Array(currentHeight)
        .fill()
        .map(() => Array(currentWidth).fill(null))
    );
  };

  return (
    <div className="cross-stitch-editor">
      <div className="editor-workspace">
        <aside className="sidebar" role="complementary" aria-label="Editor tools and settings">
          <div className="sidebar-header">
            <h2>CrossStitcher</h2>
          </div>

          <Accordion defaultActiveKey={['0', '1', '2', '3']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Tools</Accordion.Header>
              <Accordion.Body>
                <Toolbar clearGrid={clearGrid} />
                <UndoRedoControls />
                <ZoomControls />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Colours</Accordion.Header>
              <Accordion.Body>
                <ColorPalette colors={colours} />
                <div style={{ marginTop: '12px' }}>
                  <ColorLegend />
                </div>
                <div style={{ marginTop: '12px' }}>
                  <SymbolToggle />
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>File</Accordion.Header>
              <Accordion.Body>
                <div className="file-section">
                  <div className="file-operations-grid">
                    <button
                      className="file-icon-btn btn-outline-secondary"
                      onClick={() => setShowImageImport(true)}
                      title="Import (Image or Pattern File)"
                    >
                      <i className="bi bi-upload"></i>
                    </button>
                    <button
                      className="file-icon-btn btn-outline-secondary"
                      onClick={() => setShowPatternExport(true)}
                      title="Export Pattern"
                    >
                      <i className="bi bi-download"></i>
                    </button>
                  </div>
                  <GridSizeControls />
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Settings</Accordion.Header>
              <Accordion.Body>
                <CanvasBackgroundSelector />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </aside>

        <main className="main-canvas" role="main" aria-label="Pattern grid">
          <div className="canvas-container">
            <Grid />
          </div>
        </main>
      </div>

      {showImageImport && <ImageImport onClose={() => setShowImageImport(false)} />}

      {showPatternExport && <PatternExport onClose={() => setShowPatternExport(false)} />}
    </div>
  );
};

CrossStitchEditor.propTypes = {
  colours: PropTypes.arrayOf(
    PropTypes.shape({
      floss: PropTypes.string.isRequired,
      hex: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      red: PropTypes.number,
      green: PropTypes.number,
      blue: PropTypes.number,
    })
  ),
};

export default CrossStitchEditor;
