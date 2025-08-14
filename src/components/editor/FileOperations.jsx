import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { GridContext } from '../GridContext';

const FileOperations = () => {
  const { grid, setGrid, changeGridSize } = useContext(GridContext);

  // Save pattern as JSON
  const savePattern = () => {
    const patternJson = JSON.stringify(grid);
    const blob = new Blob([patternJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `cross-stitch-pattern-${new Date().toISOString().slice(0, 10)}.json`;
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
        const loadedData = JSON.parse(e.target.result);

        // Handle both old format (just grid) and new format (with metadata)
        let loadedGrid;
        if (Array.isArray(loadedData)) {
          // Old format - just the grid
          loadedGrid = loadedData;
        } else if (loadedData.grid) {
          // New format with metadata
          loadedGrid = loadedData.grid;

          // Resize grid if dimensions are provided
          if (loadedData.dimensions) {
            const { width, height } = loadedData.dimensions;
            if (width && height) {
              changeGridSize(width, height);
            }
          }
        } else {
          alert('Invalid pattern file format');
          return;
        }

        // Validate that it's a valid grid structure
        if (Array.isArray(loadedGrid) && loadedGrid.every((row) => Array.isArray(row))) {
          setGrid(loadedGrid);
        } else {
          alert('Invalid pattern file format');
        }
      } catch (error) {
        console.error('Error parsing pattern file:', error);
        alert("Failed to load pattern file. Please ensure it's a valid JSON file.");
      }
    };
    reader.readAsText(file);

    // Reset the input so the same file can be loaded again
    event.target.value = '';
  };

  return (
    <div className="file-operations-grid">
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={savePattern}
        className="file-icon-btn"
        title="Save Pattern"
        aria-label="Save pattern to file"
      >
        <i className="bi bi-download"></i>
      </Button>

      <Form.Control
        id="fileInput"
        type="file"
        onChange={loadPattern}
        accept=".json"
        hidden={true}
        aria-label="Load pattern file"
      />
      <Button
        variant="outline-secondary"
        size="sm"
        className="file-icon-btn"
        title="Load Pattern"
        aria-label="Load pattern from file"
      >
        <Form.Label
          htmlFor="fileInput"
          style={{
            width: '100%',
            height: '100%',
            margin: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <i className="bi bi-upload"></i>
        </Form.Label>
      </Button>
    </div>
  );
};

export default FileOperations;
