import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { wishlistService } from '../services/api';

const WishlistContext = createContext(null);

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return action.payload;
    case 'TOGGLE_ITEM': {
      const exists = state.find(i => i.product.id === action.payload.id);
      if (exists) return state.filter(i => i.product.id !== action.payload.id);
      return [...state, { id: action.payload.id, product: action.payload, added_at: new Date().toISOString() }];
    }
    case 'REMOVE_ITEM':
      return state.filter(i => i.product.id !== action.payload);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [items, dispatch] = useReducer(wishlistReducer, []);

  // Load wishlist if user is authenticated
  const fetchWishlist = useCallback(async () => {
    try {
      const data = await wishlistService.getWishlist();
      dispatch({ type: 'SET_ITEMS', payload: data.results || data });
    } catch {
      // User not authenticated — wishlist stays empty
    }
  }, []);

  const addItem = useCallback(async (product) => {
    await wishlistService.addToWishlist(product.id);
    dispatch({ type: 'TOGGLE_ITEM', payload: product });
  }, []);

  const removeItem = useCallback(async (productId) => {
    await wishlistService.removeFromWishlist(productId);
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  }, []);

  const toggleItem = useCallback(async (product) => {
    try {
      const data = await wishlistService.toggleWishlist(product.id);
      dispatch({ type: 'TOGGLE_ITEM', payload: product });
      return data;
    } catch {
      dispatch({ type: 'TOGGLE_ITEM', payload: product });
    }
  }, []);

  const isInWishlist = useCallback((productId) => {
    return items.some(i => i.product?.id === productId || i.id === productId);
  }, [items]);

  const clearWishlist = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const value = {
    items,
    itemCount: items.length,
    fetchWishlist,
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlistContext() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlistContext must be used within WishlistProvider');
  return ctx;
}