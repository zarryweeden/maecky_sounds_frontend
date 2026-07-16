import { useCartContext } from '../context/CartContext';
import { useUIContext } from '../context/UIContext';
import { useCallback } from 'react';

export function useCart() {
  const cart = useCartContext();
  const { openCart, addToast } = useUIContext();

  const addToCartWithFeedback = useCallback(async (product, qty = 1, variantId = null) => {
    try {
      await cart.addItem(product, qty, variantId);
      const name = product.name?.length > 35
        ? product.name.slice(0, 35) + '…'
        : product.name;
      addToast(`${name} added to cart ✓`);
      openCart();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Could not add item to cart.';
      addToast(msg, 'error');
    }
  }, [cart, openCart, addToast]);

  return {
    ...cart,
    addToCartWithFeedback,
  };
}