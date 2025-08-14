import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useUndoRedo from '../useUndoRedo';

describe('useUndoRedo Hook', () => {
  it('should initialize with the initial state', () => {
    const initialState = { value: 'initial' };
    const { result } = renderHook(() => useUndoRedo(initialState));
    
    expect(result.current.state).toEqual(initialState);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });

  it('should update state and enable undo', () => {
    const { result } = renderHook(() => useUndoRedo('initial'));
    
    act(() => {
      result.current.setState('second');
    });
    
    expect(result.current.state).toBe('second');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
  });

  it('should undo to previous state', () => {
    const { result } = renderHook(() => useUndoRedo('first'));
    
    act(() => {
      result.current.setState('second');
    });
    
    act(() => {
      result.current.setState('third');
    });
    
    expect(result.current.state).toBe('third');
    
    act(() => {
      result.current.undo();
    });
    
    expect(result.current.state).toBe('second');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(true);
    
    act(() => {
      result.current.undo();
    });
    
    expect(result.current.state).toBe('first');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(true);
  });

  it('should redo to next state', () => {
    const { result } = renderHook(() => useUndoRedo('first'));
    
    act(() => {
      result.current.setState('second');
      result.current.setState('third');
    });
    
    act(() => {
      result.current.undo();
      result.current.undo();
    });
    
    expect(result.current.state).toBe('first');
    
    act(() => {
      result.current.redo();
    });
    
    expect(result.current.state).toBe('second');
    
    act(() => {
      result.current.redo();
    });
    
    expect(result.current.state).toBe('third');
    expect(result.current.canRedo).toBe(false);
  });

  it('should clear redo history when setting new state after undo', () => {
    const { result } = renderHook(() => useUndoRedo('first'));
    
    act(() => {
      result.current.setState('second');
      result.current.setState('third');
    });
    
    act(() => {
      result.current.undo();
    });
    
    expect(result.current.state).toBe('second');
    expect(result.current.canRedo).toBe(true);
    
    act(() => {
      result.current.setState('new branch');
    });
    
    expect(result.current.state).toBe('new branch');
    expect(result.current.canRedo).toBe(false);
    expect(result.current.canUndo).toBe(true);
  });

  it('should limit history to 50 states', () => {
    const { result } = renderHook(() => useUndoRedo(0));
    
    // Add 52 states
    for (let i = 1; i <= 52; i++) {
      act(() => {
        result.current.setState(i);
      });
    }
    
    expect(result.current.state).toBe(52);
    
    // Should only be able to undo 49 times (50 states total)
    let undoCount = 0;
    while (result.current.canUndo && undoCount < 60) {
      act(() => {
        result.current.undo();
      });
      undoCount++;
    }
    
    expect(undoCount).toBe(49);
    expect(result.current.state).toBe(3); // Oldest state should be 3 (0, 1, 2 were dropped)
  });

  it('should handle clearHistory correctly', () => {
    const { result } = renderHook(() => useUndoRedo('first'));
    
    act(() => {
      result.current.setState('second');
      result.current.setState('third');
    });
    
    expect(result.current.canUndo).toBe(true);
    
    act(() => {
      result.current.clearHistory();
    });
    
    expect(result.current.state).toBe('third');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });

  it('should handle complex objects as state', () => {
    const initialGrid = [[1, 2], [3, 4]];
    const { result } = renderHook(() => useUndoRedo(initialGrid));
    
    const newGrid = [[5, 6], [7, 8]];
    act(() => {
      result.current.setState(newGrid);
    });
    
    expect(result.current.state).toEqual(newGrid);
    
    act(() => {
      result.current.undo();
    });
    
    expect(result.current.state).toEqual(initialGrid);
  });
});