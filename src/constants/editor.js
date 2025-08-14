// Grid configuration
export const GRID_CONFIG = {
  DEFAULT_WIDTH: 50,
  DEFAULT_HEIGHT: 50,
  MIN_SIZE: 10,
  MAX_SIZE: 200,
  BASE_CELL_SIZE: 18,
  GRID_LINE_INTERVAL: 10, // Show darker lines every 10 cells
};

// Zoom configuration
export const ZOOM_CONFIG = {
  MIN: 0.5,
  MAX: 3,
  STEP: 0.25,
  DEFAULT: 1,
};

// History configuration
export const HISTORY_CONFIG = {
  MAX_STATES: 50,
};

// UI configuration
export const UI_CONFIG = {
  SIDEBAR_WIDTH: 280,
  ANIMATION_DURATION: 200, // ms
};

// Canvas background presets
export const CANVAS_BACKGROUNDS = [
  { name: 'Light Gray', color: '#f5f5f5' },
  { name: 'Medium Gray', color: '#535353' },
  { name: 'Dark Gray', color: '#2d2d30' },
  { name: 'White', color: '#ffffff' },
  { name: 'Black', color: '#000000' },
  { name: 'Light Blue', color: '#e8f4f8' },
];

// Tool types
export const TOOLS = {
  PENCIL: 'pencil',
  ERASER: 'eraser',
};

// Keyboard shortcuts
export const SHORTCUTS = {
  UNDO: { key: 'z', ctrl: true },
  REDO: [
    { key: 'y', ctrl: true },
    { key: 'z', ctrl: true, shift: true }
  ],
  ZOOM_IN: { key: '=', ctrl: true },
  ZOOM_OUT: { key: '-', ctrl: true },
  ZOOM_RESET: { key: '0', ctrl: true },
  TOOL_PENCIL: { key: 'p' },
  TOOL_ERASER: { key: 'e' },
};