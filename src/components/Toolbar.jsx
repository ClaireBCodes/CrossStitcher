import Button from 'react-bootstrap/Button';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Toolbar.css';
import { GridContext } from './GridContext';

const Toolbar = ({ clearGrid }) => {
  const { selectedTool, setSelectedTool } = useContext(GridContext);

  return (
    <div className="toolbar">
      <div className="tool-buttons-grid">
        <Button
          variant={selectedTool === 'pencil' ? 'primary' : 'outline-secondary'}
          size="sm"
          className="tool-icon-btn"
          onClick={() => setSelectedTool('pencil')}
          title="Draw (Pencil Tool)"
        >
          <i className="bi bi-pencil-fill"></i>
        </Button>

        <Button
          variant={selectedTool === 'eraser' ? 'primary' : 'outline-secondary'}
          size="sm"
          className="tool-icon-btn"
          onClick={() => setSelectedTool('eraser')}
          title="Erase"
        >
          <i className="bi bi-eraser-fill"></i>
        </Button>

        <Button
          variant="outline-secondary"
          size="sm"
          className="tool-icon-btn"
          onClick={() => {
            if (window.confirm('Are you sure you want to clear the entire pattern?')) {
              clearGrid();
            }
          }}
          title="Clear All"
        >
          <i className="bi bi-trash3-fill"></i>
        </Button>
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  clearGrid: PropTypes.func.isRequired,
};

export default Toolbar;
