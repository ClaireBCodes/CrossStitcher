import React from 'react';
import Button from "react-bootstrap/Button";
import './Toolbar.css';

const Toolbar = ({ currentTool, setCurrentTool, clearGrid, savePattern }) => {
  return (
    <div className="toolbar">
      <h3>Tools</h3>
      <div className="tool-buttons">
        <Button
          variant="primary"
          className={`tool-button ${currentTool === "pencil" ? "active" : ""}`}
          onClick={() => setCurrentTool("pencil")}
          title="Pencil (Draw)"
        >
          ✏️ Draw
        </Button>

        <Button
          variant="primary"
          className={`tool-button ${currentTool === "eraser" ? "active" : ""}`}
          onClick={() => setCurrentTool("eraser")}
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
