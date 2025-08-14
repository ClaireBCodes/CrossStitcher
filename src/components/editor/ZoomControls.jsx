import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { GridContext } from '../GridContext';
import { ZOOM_CONFIG } from '../../constants/editor';

const ZoomControls = () => {
  const { zoomLevel, zoomIn, zoomOut, resetZoom } = useContext(GridContext);
  
  return (
    <div className="zoom-controls">
      <Button
        variant="outline-secondary"
        size="sm"
        className="zoom-icon-btn"
        onClick={zoomOut}
        disabled={zoomLevel <= ZOOM_CONFIG.MIN}
        title="Zoom Out (Ctrl+-)"
      >
        <i className="bi bi-zoom-out"></i>
      </Button>
      
      <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
      
      <Button
        variant="outline-secondary"
        size="sm"
        className="zoom-icon-btn"
        onClick={zoomIn}
        disabled={zoomLevel >= ZOOM_CONFIG.MAX}
        title="Zoom In (Ctrl+=)"
      >
        <i className="bi bi-zoom-in"></i>
      </Button>
      
      <Button
        variant="outline-secondary"
        size="sm"
        className="zoom-icon-btn"
        onClick={resetZoom}
        title="Reset Zoom (Ctrl+0)"
      >
        <i className="bi bi-aspect-ratio"></i>
      </Button>
    </div>
  );
};

export default ZoomControls;