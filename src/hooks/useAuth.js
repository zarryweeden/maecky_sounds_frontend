import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useUIContext } from '../context/UIContext';
import { useWishlistContext } from '../context/WishlistContext';
import { useCartContext } from '../context/CartContext';

export function useAuth() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const { addToast } = useUIContext();
  const { fetchWishlist, clearWishlist } = useWishlistContext();
  const { fetchCart } = useCartContext();

  const loginAndRedirect = useCallback(async (email, password, redirectTo = '/account') => {
    const result = await auth.login(email, password);
    if (result.success) {
      const firstName = auth.user?.full_name?.split(' ')[0] || 'there';
      addToast(`Welcome back, ${firstName}! ✓`);
      // Load user-specific data after login
      await Promise.all([fetchWishlist(), fetchCart()]);
      navigate(redirectTo);
    }
    return result;
  }, [auth, navigate, addToast, fetchWishlist, fetchCart]);

  const signupAndRedirect = useCallback(async (data, redirectTo = '/') => {
    const result = await auth.signup(data);
    if (result.success) {
      addToast('Account created! Welcome to Maecky Sounds ✓');
      navigate(redirectTo);
    }
    return result;
  }, [auth, navigate, addToast]);

  const logoutAndRedirect = useCallback(async (redirectTo = '/') => {
    await auth.logout();
    clearWishlist();
    addToast('Signed out successfully');
    navigate(redirectTo);
  }, [auth, navigate, addToast, clearWishlist]);

  return {
    ...auth,
    loginAndRedirect,
    signupAndRedirect,
    logoutAndRedirect,
  };
}