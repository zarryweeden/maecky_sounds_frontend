import { useWishlistContext } from '../context/WishlistContext';
import { useUIContext } from '../context/UIContext';
import { useCallback } from 'react';

export function useWishlist() {
  const wishlist = useWishlistContext();
  const { addToast } = useUIContext();

  const toggleWithFeedback = useCallback(async (product) => {
    try {
      const wasIn = wishlist.isInWishlist(product.id);
      await wishlist.toggleItem(product);
      addToast(wasIn ? 'Removed from Wishlist' : 'Added to Wishlist ♥');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Could not update wishlist.';
      addToast(msg, 'error');
    }
  }, [wishlist, addToast]);

  return {
    ...wishlist,
    toggleWithFeedback,
  };
}