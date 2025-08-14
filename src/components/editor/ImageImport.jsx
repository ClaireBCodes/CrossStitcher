import React, { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { GridContext } from '../GridContext';
import ImageProcessor from '../../utils/imageProcessor';
import './ImageImport.css';

const ImageImport = ({ onClose }) => {
  const { grid, setGrid, changeGridSize } = useContext(GridContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [importSettings, setImportSettings] = useState({
    width: grid[0]?.length || 50,
    height: grid.length || 50,
    maxColors: 20,
    maintainAspectRatio: true
  });
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const imageProcessor = useRef(new ImageProcessor());

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Calculate dimensions maintaining aspect ratio if needed
          if (importSettings.maintainAspectRatio) {
            const aspectRatio = img.width / img.height;
            const targetRatio = importSettings.width / importSettings.height;
            
            let newWidth = importSettings.width;
            let newHeight = importSettings.height;
            
            if (aspectRatio > targetRatio) {
              newHeight = Math.round(importSettings.width / aspectRatio);
            } else {
              newWidth = Math.round(importSettings.height * aspectRatio);
            }
            
            setImportSettings(prev => ({
              ...prev,
              width: newWidth,
              height: newHeight
            }));
          }
          
          setPreview({
            src: e.target.result,
            originalWidth: img.width,
            originalHeight: img.height
          });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to load image: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImport = async () => {
    if (!preview) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Update image processor settings
      imageProcessor.current.maxColors = importSettings.maxColors;

      // Convert file input to File object
      const file = fileInputRef.current.files[0];
      
      // Process the image
      const result = await imageProcessor.current.processImage(
        file,
        importSettings.width,
        importSettings.height
      );

      // Update grid size if needed
      if (grid.length !== importSettings.height || grid[0]?.length !== importSettings.width) {
        changeGridSize(importSettings.width, importSettings.height);
      }

      // Apply the pattern to the grid
      setGrid(result.grid);

      // Close the import dialog
      onClose();
    } catch (err) {
      setError('Failed to process image: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSettingChange = (key, value) => {
    setImportSettings(prev => {
      const updated = { ...prev, [key]: value };
      
      // Recalculate dimensions if aspect ratio lock is enabled
      if (key === 'maintainAspectRatio' && value && preview) {
        const aspectRatio = preview.originalWidth / preview.originalHeight;
        updated.height = Math.round(updated.width / aspectRatio);
      } else if (preview && prev.maintainAspectRatio) {
        const aspectRatio = preview.originalWidth / preview.originalHeight;
        if (key === 'width') {
          updated.height = Math.round(value / aspectRatio);
        } else if (key === 'height') {
          updated.width = Math.round(value * aspectRatio);
        }
      }
      
      return updated;
    });
  };

  return (
    <div className="image-import-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Import Image as Pattern</h3>
          <button 
            className="close-button"
            onClick={onClose}
            aria-label="Close import dialog"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>

        <div className="modal-body">
          <div className="file-input-section">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="image-file-input"
            />
            <label htmlFor="image-file-input" className="file-input-label">
              <i className="bi bi-upload"></i>
              {preview ? 'Change Image' : 'Select Image'}
            </label>
          </div>

          {preview && (
            <div className="preview-section">
              <img 
                src={preview.src} 
                alt="Preview" 
                className="image-preview"
              />
              <div className="original-dimensions">
                Original: {preview.originalWidth} × {preview.originalHeight}px
              </div>
            </div>
          )}

          <div className="settings-section">
            <h4>Import Settings</h4>
            
            <div className="setting-group">
              <label htmlFor="pattern-width">Pattern Width</label>
              <input
                id="pattern-width"
                type="number"
                min="10"
                max="200"
                value={importSettings.width}
                onChange={(e) => handleSettingChange('width', parseInt(e.target.value))}
                disabled={isProcessing}
              />
            </div>

            <div className="setting-group">
              <label htmlFor="pattern-height">Pattern Height</label>
              <input
                id="pattern-height"
                type="number"
                min="10"
                max="200"
                value={importSettings.height}
                onChange={(e) => handleSettingChange('height', parseInt(e.target.value))}
                disabled={isProcessing}
              />
            </div>

            <div className="setting-group">
              <label>
                <input
                  type="checkbox"
                  checked={importSettings.maintainAspectRatio}
                  onChange={(e) => handleSettingChange('maintainAspectRatio', e.target.checked)}
                  disabled={isProcessing}
                />
                Maintain aspect ratio
              </label>
            </div>

            <div className="setting-group">
              <label htmlFor="max-colors">Maximum Colors</label>
              <input
                id="max-colors"
                type="number"
                min="2"
                max="50"
                value={importSettings.maxColors}
                onChange={(e) => handleSettingChange('maxColors', parseInt(e.target.value))}
                disabled={isProcessing}
              />
              <small>Fewer colors create simpler patterns</small>
            </div>
          </div>

          {error && (
            <div className="error-message" role="alert">
              <i className="bi bi-exclamation-triangle"></i>
              {error}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button 
            className="btn-secondary"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button 
            className="btn-primary"
            onClick={handleImport}
            disabled={!preview || isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              'Import Pattern'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

ImageImport.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ImageImport;