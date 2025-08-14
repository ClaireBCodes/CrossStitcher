import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { GridContext } from '../GridContext';
import { CANVAS_BACKGROUNDS } from '../../constants/editor';

const CanvasBackgroundSelector = () => {
  const { canvasBackground, setCanvasBackground } = useContext(GridContext);

  return (
    <div className="settings-controls">
      <h6 className="section-label">Canvas Background</h6>
      <div className="background-presets">
        {CANVAS_BACKGROUNDS.map((bg) => (
          <Button
            key={bg.color}
            variant="outline-secondary"
            size="sm"
            className="bg-preset-btn"
            onClick={() => setCanvasBackground(bg.color)}
            title={bg.name}
            style={{ backgroundColor: bg.color }}
            aria-label={`Set background to ${bg.name}`}
          />
        ))}
      </div>
      <InputGroup size="sm" className="mt-2">
        <InputGroup.Text>Custom</InputGroup.Text>
        <Form.Control
          type="color"
          value={canvasBackground}
          onChange={(e) => setCanvasBackground(e.target.value)}
          title="Choose custom color"
          aria-label="Custom background color"
        />
      </InputGroup>
    </div>
  );
};

export default CanvasBackgroundSelector;