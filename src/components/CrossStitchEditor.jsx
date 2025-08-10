import React, { useState, useEffect, useContext } from 'react';
import Grid from './Grid';
import ColorPalette from './ColorPalette';
import Toolbar from './Toolbar';
import './CrossStitchEditor.css';
import { GridContext } from './GridContext';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";


const CrossStitchEditor = ({colours = [], gridSize = 100}) => {
  const { grid, setGrid } = useContext(GridContext);

  // Clear the entire grid
  const clearGrid = () => {
    setGrid(Array(gridSize).fill().map(() => Array(gridSize).fill(null)));
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
      <h1>Cross-Stitch Pattern Editor</h1>

      <div className="editor-layout">
        <div className="tools-panel">
          <Toolbar
            clearGrid={clearGrid}
            savePattern={savePattern}
          />

          <div className="file-operations">
            <Button variant="primary" type="button" onClick={savePattern}>
              Save Pattern
            </Button>

            <Form.Control
              id="fileInput"
              type="file"
              onChange={loadPattern}
              hidden={true}
            />
            <Button>
              <Form.Label
                htmlFor="fileInput"
                style={{ width: "100%", margin: 0, cursor: "pointer" }}
              >
                Load Pattern
              </Form.Label>
            </Button>

            {/* Josh version */}
            {/* <Form.Group>
              <Form.Label>
                <Button>Load Pattern</Button>
                <Form.Control type="file" onChange={loadPattern} />
              </Form.Label>
            </Form.Group> */}

            {/* AI Attempt */}
            {/* <input
              type="file"
              id="load-pattern"
              accept=".json"
              onChange={loadPattern}
              style={{ display: "none" }}
            />
            <label htmlFor="load-pattern" className="button-like">
              <Button variant="primary">Load Pattern</Button>
            </label> */}
          </div>
          
          <ColorPalette 
            colors={colours}
          />
        </div>

        <div className="grid-container">
          <Grid />
        </div>
      </div>
    </div>
  );
};

export default CrossStitchEditor;