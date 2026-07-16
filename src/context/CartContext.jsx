import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { cartService } from '../services/api';

const CartContext = createContext(null);

const initialState = {
  items: [],
  couponCode: null,
  couponInfo: null,
  discount: 0,
  subtotal: 0,
  discountAmount: 0,
  shipping: 0,
  total: 0,
  itemCount: 0,
  loading: false,
  cartId: null,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_CART': {
      const cart = action.payload;
      return {
        ...state,
        loading: false,
        cartId: cart.id,
        items: cart.items || [],
        couponCode: cart.coupon_info?.code || null,
        couponInfo: cart.coupon_info || null,
        subtotal: cart.subtotal || 0,
        discountAmount: cart.discount_amount || 0,
        shipping: cart.shipping_cost || 0,
        total: cart.total || 0,
        itemCount: cart.total_items || 0,
      };
    }

    case 'CLEAR_CART':
      return { ...initialState };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await cartService.getCart();
      dispatch({ type: 'SET_CART', payload: data });
    } catch {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const addItem = useCallback(async (product, qty = 1, variantId = null) => {
    const data = await cartService.addItem(product.id, qty, variantId);
    dispatch({ type: 'SET_CART', payload: data });
  }, []);

  const removeItem = useCallback(async (itemId) => {
    const data = await cartService.removeItem(itemId);
    dispatch({ type: 'SET_CART', payload: data });
  }, []);

  const updateQuantity = useCallback(async (itemId, qty) => {
    const data = await cartService.updateItem(itemId, qty);
    dispatch({ type: 'SET_CART', payload: data });
  }, []);

  const clearCart = useCallback(async () => {
    await cartService.clearCart();
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const applyCoupon = useCallback(async (code) => {
    const data = await cartService.applyCoupon(code);
    if (data.status === 'success') {
      dispatch({ type: 'SET_CART', payload: data.cart });
      return { success: true, message: data.message };
    }
    return { success: false, message: data.message };
  }, []);

  const removeCoupon = useCallback(async () => {
    const data = await cartService.removeCoupon();
    dispatch({ type: 'SET_CART', payload: data.cart });
  }, []);

  const value = {
    items: state.items,
    couponCode: state.couponCode,
    couponInfo: state.couponInfo,
    subtotal: state.subtotal,
    discountAmount: state.discountAmount,
    shipping: state.shipping,
    total: state.total,
    itemCount: state.itemCount,
    loading: state.loading,
    cartId: state.cartId,
    fetchCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
}