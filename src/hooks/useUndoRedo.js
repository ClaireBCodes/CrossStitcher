import { useReducer, useCallback } from 'react';

const initialState = (initial) => ({
  history: [initial],
  currentIndex: 0
});

const undoRedoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STATE': {
      const newHistory = state.history.slice(0, state.currentIndex + 1);
      newHistory.push(action.payload);
      
      // Limit history to 50 states
      if (newHistory.length > 50) {
        return {
          history: newHistory.slice(1),
          currentIndex: 49
        };
      }
      
      return {
        history: newHistory,
        currentIndex: newHistory.length - 1
      };
    }
    
    case 'UNDO': {
      return {
        ...state,
        currentIndex: Math.max(0, state.currentIndex - 1)
      };
    }
    
    case 'REDO': {
      return {
        ...state,
        currentIndex: Math.min(state.history.length - 1, state.currentIndex + 1)
      };
    }
    
    case 'CLEAR_HISTORY': {
      return {
        history: [state.history[state.currentIndex]],
        currentIndex: 0
      };
    }
    
    default:
      return state;
  }
};

export const useUndoRedo = (initialValue) => {
  const [state, dispatch] = useReducer(undoRedoReducer, initialValue, initialState);

  const setState = useCallback((newState) => {
    dispatch({ type: 'SET_STATE', payload: newState });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  const clearHistory = useCallback(() => {
    dispatch({ type: 'CLEAR_HISTORY' });
  }, []);

  const canUndo = state.currentIndex > 0;
  const canRedo = state.currentIndex < state.history.length - 1;
  const currentState = state.history[state.currentIndex];

  return {
    state: currentState,
    setState,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory
  };
};

export default useUndoRedo;