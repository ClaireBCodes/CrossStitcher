import React, { useState, useEffect, useRef } from "react";
import Grid from "./Grid";
import ColorPalette from "./ColorPalette";
import Button from "react-bootstrap/Button";
import Toolbar from "./Toolbar";
import "./CrossStitchEditor.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const CrossStitchEditor = () => {
  // Grid dimensions
  const GRID_SIZE = 100;

  // Initialize empty grid with null values (no color)
  const [grid, setGrid] = useState(
    Array(GRID_SIZE)
      .fill()
      .map(() => Array(GRID_SIZE).fill(null))
  );

  // State for selected color and tool
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentTool, setCurrentTool] = useState("pencil"); // pencil, eraser
  const [dmcColors, setDmcColors] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Load DMC colors
  useEffect(() => {
    fetch("/dmc.json")
      .then((response) => response.json())
      .then((data) => setDmcColors(data))
      .catch((error) => console.error("Error loading DMC colors:", error));
  }, []);

  // Handle cell click or drag
  const handleCellInteraction = (row, col) => {
    if (!isDrawing) return;

    const newGrid = [...grid];
    if (currentTool === "pencil" && selectedColor) {
      newGrid[row][col] = selectedColor;
    } else if (currentTool === "eraser") {
      newGrid[row][col] = null;
    }
    setGrid(newGrid);
  };

  // Handle mouse down on grid
  const handleMouseDown = (row, col) => {
    setIsDrawing(true);
    handleCellInteraction(row, col);
  };

  // Handle mouse up (stop drawing)
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Clear the entire grid
  const clearGrid = () => {
    setGrid(
      Array(GRID_SIZE)
        .fill()
        .map(() => Array(GRID_SIZE).fill(null))
    );
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
            currentTool={currentTool}
            setCurrentTool={setCurrentTool}
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
                Flooble
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
            colors={dmcColors}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />
        </div>

        <div className="grid-container">
          <Grid
            grid={grid}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleCellInteraction}
            onMouseUp={handleMouseUp}
          />
        </div>
      </div>
    </div>
  );
};

export default CrossStitchEditor;
