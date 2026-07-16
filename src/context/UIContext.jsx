import React, { createContext, useContext, useReducer, useCallback, useRef } from 'react';

const UIContext = createContext(null);

const initialState = {
  cartDrawerOpen: false,
  mobileMenuOpen: false,
  searchOpen: false,
  activeToasts: [],
};

let toastIdCounter = 0;

function uiReducer(state, action) {
  switch (action.type) {
    case 'OPEN_CART':
      return { ...state, cartDrawerOpen: true };
    case 'CLOSE_CART':
      return { ...state, cartDrawerOpen: false };
    case 'TOGGLE_CART':
      return { ...state, cartDrawerOpen: !state.cartDrawerOpen };

    case 'OPEN_MENU':
      return { ...state, mobileMenuOpen: true };
    case 'CLOSE_MENU':
      return { ...state, mobileMenuOpen: false };
    case 'TOGGLE_MENU':
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen };

    case 'OPEN_SEARCH':
      return { ...state, searchOpen: true };
    case 'CLOSE_SEARCH':
      return { ...state, searchOpen: false };

    case 'ADD_TOAST':
      return {
        ...state,
        activeToasts: [
          ...state.activeToasts,
          { id: action.payload.id, message: action.payload.message, type: action.payload.type || 'success' },
        ],
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        activeToasts: state.activeToasts.filter(t => t.id !== action.payload),
      };

    default:
      return state;
  }
}

export function UIProvider({ children }) {
  const [state, dispatch] = useReducer(uiReducer, initialState);
  const toastTimeouts = useRef({});

  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), []);
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), []);
  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), []);

  const openMenu = useCallback(() => dispatch({ type: 'OPEN_MENU' }), []);
  const closeMenu = useCallback(() => dispatch({ type: 'CLOSE_MENU' }), []);
  const toggleMenu = useCallback(() => dispatch({ type: 'TOGGLE_MENU' }), []);

  const openSearch = useCallback(() => dispatch({ type: 'OPEN_SEARCH' }), []);
  const closeSearch = useCallback(() => dispatch({ type: 'CLOSE_SEARCH' }), []);

  const removeToast = useCallback((id) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
    if (toastTimeouts.current[id]) {
      clearTimeout(toastTimeouts.current[id]);
      delete toastTimeouts.current[id];
    }
  }, []);

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = ++toastIdCounter;
    dispatch({ type: 'ADD_TOAST', payload: { id, message, type } });
    toastTimeouts.current[id] = setTimeout(() => {
      removeToast(id);
    }, duration);
    return id;
  }, [removeToast]);

  const value = {
    cartDrawerOpen: state.cartDrawerOpen,
    mobileMenuOpen: state.mobileMenuOpen,
    searchOpen: state.searchOpen,
    activeToasts: state.activeToasts,
    openCart,
    closeCart,
    toggleCart,
    openMenu,
    closeMenu,
    toggleMenu,
    openSearch,
    closeSearch,
    addToast,
    removeToast,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUIContext() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUIContext must be used within UIProvider');
  return ctx;
}