import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { GridContext } from '../GridContext';
import { GRID_CONFIG } from '../../constants/editor';

const GridSizeControls = () => {
  const { grid, changeGridSize } = useContext(GridContext);
  const [newWidth, setNewWidth] = useState(grid[0]?.length || GRID_CONFIG.DEFAULT_WIDTH);
  const [newHeight, setNewHeight] = useState(grid.length || GRID_CONFIG.DEFAULT_HEIGHT);

  const handleWidthChange = (e) => {
    const value = parseInt(e.target.value) || GRID_CONFIG.MIN_SIZE;
    setNewWidth(Math.max(GRID_CONFIG.MIN_SIZE, Math.min(GRID_CONFIG.MAX_SIZE, value)));
  };

  const handleHeightChange = (e) => {
    const value = parseInt(e.target.value) || GRID_CONFIG.MIN_SIZE;
    setNewHeight(Math.max(GRID_CONFIG.MIN_SIZE, Math.min(GRID_CONFIG.MAX_SIZE, value)));
  };

  const handleApplySize = () => {
    if (
      window.confirm(
        `Change grid size to ${newWidth}x${newHeight}? This will clear the undo history.`
      )
    ) {
      changeGridSize(newWidth, newHeight);
    }
  };

  return (
    <div className="grid-size-controls">
      <h6 className="section-label">Grid Size</h6>
      <InputGroup size="sm">
        <InputGroup.Text>W</InputGroup.Text>
        <Form.Control
          type="number"
          value={newWidth}
          onChange={handleWidthChange}
          min={GRID_CONFIG.MIN_SIZE}
          max={GRID_CONFIG.MAX_SIZE}
          aria-label="Grid width"
        />
        <InputGroup.Text>H</InputGroup.Text>
        <Form.Control
          type="number"
          value={newHeight}
          onChange={handleHeightChange}
          min={GRID_CONFIG.MIN_SIZE}
          max={GRID_CONFIG.MAX_SIZE}
          aria-label="Grid height"
        />
      </InputGroup>
      <Button
        variant="outline-secondary"
        size="sm"
        className="w-100 mt-2"
        onClick={handleApplySize}
      >
        <i className="bi bi-grid-3x3"></i> Apply Size
      </Button>
    </div>
  );
};

export default GridSizeControls;
