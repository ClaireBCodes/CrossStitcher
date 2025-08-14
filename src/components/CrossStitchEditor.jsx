import React, { useContext, useState } from 'react';
import Grid from './Grid';
import ColorPalette from './ColorPalette';
import Toolbar from './Toolbar';
import './CrossStitchEditor.css';
import { GridContext } from './GridContext';
import Accordion from "react-bootstrap/Accordion";

// Extracted components
import UndoRedoControls from './editor/UndoRedoControls';
import ZoomControls from './editor/ZoomControls';
import FileOperations from './editor/FileOperations';
import GridSizeControls from './editor/GridSizeControls';
import CanvasBackgroundSelector from './editor/CanvasBackgroundSelector';
import ImageImport from './editor/ImageImport';

const CrossStitchEditor = ({ colours = [] }) => {
  const { grid, setGrid } = useContext(GridContext);
  const [showImageImport, setShowImageImport] = useState(false);

  // Clear the entire grid
  const clearGrid = () => {
    const currentHeight = grid.length;
    const currentWidth = grid[0]?.length || 50;
    setGrid(Array(currentHeight).fill().map(() => Array(currentWidth).fill(null)));
  };

  // Legacy save function for Toolbar - will be removed when Toolbar is refactored
  const savePattern = () => {
    const patternJson = JSON.stringify(grid);
    const blob = new Blob([patternJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cross-stitch-pattern-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
                <Toolbar
                  clearGrid={clearGrid}
                  savePattern={savePattern}
                />
                <UndoRedoControls />
                <ZoomControls />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Colors</Accordion.Header>
              <Accordion.Body>
                <ColorPalette colors={colours} />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>File</Accordion.Header>
              <Accordion.Body>
                <FileOperations />
                <button 
                  className="btn-icon-text"
                  onClick={() => setShowImageImport(true)}
                  title="Import image as pattern"
                >
                  <i className="bi bi-image"></i>
                  <span>Import Image</span>
                </button>
                <GridSizeControls />
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
      
      {showImageImport && (
        <ImageImport onClose={() => setShowImageImport(false)} />
      )}
    </div>
  );
};

export default CrossStitchEditor;