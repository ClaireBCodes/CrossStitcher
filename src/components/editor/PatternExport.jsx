import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { GridContext } from '../GridContext';
import PatternExporter from '../../utils/patternExporter';
import './PatternExport.css';

const PatternExport = ({ onClose }) => {
  const { grid } = useContext(GridContext);
  const [exportSettings, setExportSettings] = useState({
    format: 'png',
    filename: `pattern-${new Date().toISOString().slice(0, 10)}`,
    includeGrid: true,
    includeLegend: true,
    cellSize: 20,
  });
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    const exporter = new PatternExporter();

    // Apply settings
    if (exportSettings.cellSize) {
      exporter.cellSize = exportSettings.cellSize;
    }

    const filename = `${exportSettings.filename}.${exportSettings.format}`;

    try {
      switch (exportSettings.format) {
        case 'png':
          exporter.exportAsPNG(grid, filename);
          break;
        case 'pdf':
          // Note: This currently exports as high-res PNG
          exporter.exportAsPDF(grid, filename);
          break;
        case 'json':
          exporter.exportAsJSON(grid, filename);
          break;
        case 'csv':
          exporter.exportAsCSV(grid, filename);
          break;
        default:
          console.error('Unknown export format:', exportSettings.format);
      }

      // Close modal after successful export
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export pattern. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSettingChange = (key, value) => {
    setExportSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const formatDescriptions = {
    png: 'Image file suitable for viewing and printing',
    pdf: 'High-resolution image for printing (PDF coming soon)',
    json: 'Pattern data file that can be imported back',
    csv: 'Spreadsheet format for Excel or Google Sheets',
  };

  return (
    <div className="pattern-export-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Export Pattern</h3>
          <button className="close-button" onClick={onClose} aria-label="Close export dialog">
            <i className="bi bi-x"></i>
          </button>
        </div>

        <div className="modal-body">
          <div className="export-section">
            <h4>Export Format</h4>
            <div className="format-options">
              {['png', 'pdf', 'json', 'csv'].map((format) => (
                <label key={format} className="format-option">
                  <input
                    type="radio"
                    name="format"
                    value={format}
                    checked={exportSettings.format === format}
                    onChange={(e) => handleSettingChange('format', e.target.value)}
                  />
                  <div className="format-info">
                    <span className="format-name">{format.toUpperCase()}</span>
                    <small>{formatDescriptions[format]}</small>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="export-section">
            <h4>Filename</h4>
            <div className="filename-input">
              <input
                type="text"
                value={exportSettings.filename}
                onChange={(e) => handleSettingChange('filename', e.target.value)}
                placeholder="Enter filename"
              />
              <span className="file-extension">.{exportSettings.format}</span>
            </div>
          </div>

          {(exportSettings.format === 'png' || exportSettings.format === 'pdf') && (
            <div className="export-section">
              <h4>Image Options</h4>
              <div className="image-options">
                <label>
                  Cell Size:
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={exportSettings.cellSize}
                    onChange={(e) => handleSettingChange('cellSize', parseInt(e.target.value))}
                  />
                  <span>{exportSettings.cellSize}px</span>
                </label>
              </div>
            </div>
          )}

          <div className="export-preview">
            <div className="preview-info">
              <i className="bi bi-grid-3x3"></i>
              <div>
                <strong>Pattern Size:</strong> {grid[0]?.length || 0} × {grid.length}
              </div>
            </div>
            <div className="preview-info">
              <i className="bi bi-palette"></i>
              <div>
                <strong>Colors Used:</strong>{' '}
                {(() => {
                  const colors = new Set();
                  grid.forEach((row) => {
                    row.forEach((cell) => {
                      if (cell) colors.add(cell.floss);
                    });
                  });
                  return colors.size;
                })()}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose} disabled={isExporting}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <span className="spinner"></span>
                Exporting...
              </>
            ) : (
              <>
                <i className="bi bi-download"></i>
                Export
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

PatternExport.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PatternExport;
