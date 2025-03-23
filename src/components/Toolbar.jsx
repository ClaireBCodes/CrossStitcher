import React from 'react';
import './Toolbar.css';

const Toolbar = ({ currentTool, setCurrentTool, clearGrid, savePattern }) => {
  return (
    <div className="toolbar">
      <h3>Tools</h3>
      <div className="tool-buttons">
        <button 
          className={`tool-button ${currentTool === 'pencil' ? 'active' : ''}`}
          onClick={() => setCurrentTool('pencil')}
          title="Pencil (Draw)"
        >
          ✏️ Draw
        </button>
        
        <button 
          className={`tool-button ${currentTool === 'eraser' ? 'active' : ''}`}
          onClick={() => setCurrentTool('eraser')}
          title="Eraser"
        >
          🧽 Erase
        </button>
        
        <button 
          className="tool-button danger"
          onClick={() => {
            if (window.confirm('Are you sure you want to clear the entire pattern?')) {
              clearGrid();
            }
          }}
          title="Clear entire pattern"
        >
          🗑️ Clear All
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
