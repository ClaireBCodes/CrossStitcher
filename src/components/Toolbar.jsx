import Button from "react-bootstrap/Button";
import React, { useContext } from 'react';
import './Toolbar.css';
import { GridContext } from './GridContext';

const Toolbar = ({ clearGrid, savePattern }) => {
  const { selectedTool, setSelectedTool} = useContext(GridContext);

  return (
    <div className="toolbar">
      <h3>Tools</h3>
      <div className="tool-buttons">
        <Button
          variant="primary"
          className={`tool-button ${selectedTool === 'pencil' ? 'active' : ''}`}
          onClick={() => setSelectedTool("pencil")}
          title="Pencil (Draw)"
        >
          ✏️ Draw
        </Button>

        <Button
          variant="primary"
          className={`tool-button ${selectedTool === "eraser" ? "active" : ""}`}
          onClick={() => setSelectedTool("eraser")}
          title="Eraser"
        >
          🧽 Erase
        </Button>

        <Button
          variant="danger"
          className="tool-button"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to clear the entire pattern?"
              )
            ) {
              clearGrid();
            }
          }}
          title="Clear entire pattern"
        >
          🗑️ Clear All
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
