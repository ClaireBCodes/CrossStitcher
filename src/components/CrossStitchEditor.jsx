import React, { useState, useEffect, useContext } from 'react';
import Grid from './Grid';
import ColorPalette from './ColorPalette';
import Toolbar from './Toolbar';
import './CrossStitchEditor.css';
import { GridContext } from './GridContext';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Accordion from "react-bootstrap/Accordion";
import InputGroup from "react-bootstrap/InputGroup";


const CrossStitchEditor = ({colours = []}) => {
  const { 
    grid, 
    setGrid, 
    undo, 
    redo, 
    canUndo, 
    canRedo,
    zoomIn,
    zoomOut,
    resetZoom,
    zoomLevel,
    changeGridSize,
    canvasBackground,
    setCanvasBackground
  } = useContext(GridContext);

  const [newWidth, setNewWidth] = useState(50);
  const [newHeight, setNewHeight] = useState(50);

  // Clear the entire grid
  const clearGrid = () => {
    const currentHeight = grid.length;
    const currentWidth = grid[0]?.length || 50;
    setGrid(Array(currentHeight).fill().map(() => Array(currentWidth).fill(null)));
  };

  // Save pattern as JSON
  const savePattern = () => {
    const patternJson = JSON.stringify(grid);
    const blob = new Blob([patternJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cross-stitch-pattern.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  // Load pattern from JSON file
  const loadPattern = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const loadedGrid = JSON.parse(e.target.result);
        setGrid(loadedGrid);
      } catch (error) {
        console.error("Error parsing pattern file:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="cross-stitch-editor">
      <div className="editor-workspace">
        <aside className="sidebar">
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
                <div className="edit-controls">
                  <Button
                    variant={canUndo ? "outline-secondary" : "outline-dark"}
                    size="sm"
                    className="edit-icon-btn"
                    onClick={undo}
                    disabled={!canUndo}
                    title="Undo (Ctrl+Z)"
                  >
                    <i className="bi bi-arrow-counterclockwise"></i>
                  </Button>
                  <Button
                    variant={canRedo ? "outline-secondary" : "outline-dark"}
                    size="sm"
                    className="edit-icon-btn"
                    onClick={redo}
                    disabled={!canRedo}
                    title="Redo (Ctrl+Y)"
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                  </Button>
                </div>
                <div className="zoom-controls">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="zoom-icon-btn"
                    onClick={zoomOut}
                    title="Zoom Out (Ctrl+-)"
                  >
                    <i className="bi bi-zoom-out"></i>
                  </Button>
                  <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="zoom-icon-btn"
                    onClick={zoomIn}
                    title="Zoom In (Ctrl+=)"
                  >
                    <i className="bi bi-zoom-in"></i>
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="zoom-icon-btn"
                    onClick={resetZoom}
                    title="Reset Zoom (Ctrl+0)"
                  >
                    <i className="bi bi-aspect-ratio"></i>
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Colors</Accordion.Header>
              <Accordion.Body>
                <ColorPalette 
                  colors={colours}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>File</Accordion.Header>
              <Accordion.Body>
                <div className="file-operations-grid">
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    onClick={savePattern}
                    className="file-icon-btn"
                    title="Save Pattern"
                  >
                    <i className="bi bi-download"></i>
                  </Button>

                  <Form.Control
                    id="fileInput"
                    type="file"
                    onChange={loadPattern}
                    hidden={true}
                  />
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    className="file-icon-btn"
                    title="Load Pattern"
                  >
                    <Form.Label
                      htmlFor="fileInput"
                      style={{ width: "100%", height: "100%", margin: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <i className="bi bi-upload"></i>
                    </Form.Label>
                  </Button>
                </div>
                <div className="grid-size-controls">
                  <h6 className="section-label">Grid Size</h6>
                  <InputGroup size="sm">
                    <InputGroup.Text>W</InputGroup.Text>
                    <Form.Control
                      type="number"
                      value={newWidth}
                      onChange={(e) => setNewWidth(Math.max(10, Math.min(200, parseInt(e.target.value) || 10)))}
                      min="10"
                      max="200"
                    />
                    <InputGroup.Text>H</InputGroup.Text>
                    <Form.Control
                      type="number"
                      value={newHeight}
                      onChange={(e) => setNewHeight(Math.max(10, Math.min(200, parseInt(e.target.value) || 10)))}
                      min="10"
                      max="200"
                    />
                  </InputGroup>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="w-100 mt-2"
                    onClick={() => {
                      if (window.confirm(`Change grid size to ${newWidth}x${newHeight}? This will clear the undo history.`)) {
                        changeGridSize(newWidth, newHeight);
                      }
                    }}
                  >
                    <i className="bi bi-grid-3x3"></i> Apply Size
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Settings</Accordion.Header>
              <Accordion.Body>
                <div className="settings-controls">
                  <h6 className="section-label">Canvas Background</h6>
                  <div className="background-presets">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="bg-preset-btn"
                      onClick={() => setCanvasBackground('#f5f5f5')}
                      title="Light Gray"
                      style={{ backgroundColor: '#f5f5f5' }}
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="bg-preset-btn"
                      onClick={() => setCanvasBackground('#535353')}
                      title="Medium Gray"
                      style={{ backgroundColor: '#535353' }}
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="bg-preset-btn"
                      onClick={() => setCanvasBackground('#2d2d30')}
                      title="Dark Gray"
                      style={{ backgroundColor: '#2d2d30' }}
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="bg-preset-btn"
                      onClick={() => setCanvasBackground('#ffffff')}
                      title="White"
                      style={{ backgroundColor: '#ffffff' }}
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="bg-preset-btn"
                      onClick={() => setCanvasBackground('#000000')}
                      title="Black"
                      style={{ backgroundColor: '#000000' }}
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="bg-preset-btn"
                      onClick={() => setCanvasBackground('#e8f4f8')}
                      title="Light Blue"
                      style={{ backgroundColor: '#e8f4f8' }}
                    />
                  </div>
                  <InputGroup size="sm" className="mt-2">
                    <InputGroup.Text>Custom</InputGroup.Text>
                    <Form.Control
                      type="color"
                      value={canvasBackground}
                      onChange={(e) => setCanvasBackground(e.target.value)}
                      title="Choose custom color"
                    />
                  </InputGroup>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </aside>

        <main className="main-canvas">
          <div className="canvas-container">
            <Grid />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CrossStitchEditor;