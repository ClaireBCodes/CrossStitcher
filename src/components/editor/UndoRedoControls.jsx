import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { GridContext } from '../GridContext';

const UndoRedoControls = () => {
  const { undo, redo, canUndo, canRedo } = useContext(GridContext);
  
  return (
    <div className="edit-controls">
      <Button
        variant={canUndo ? "outline-secondary" : "outline-dark"}
        size="sm"
        className="edit-icon-btn"
        onClick={undo}
        disabled={!canUndo}
        title="Undo (Ctrl+Z)"
        aria-label="Undo last action"
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
        aria-label="Redo last action"
      >
        <i className="bi bi-arrow-clockwise"></i>
      </Button>
    </div>
  );
};

export default UndoRedoControls;