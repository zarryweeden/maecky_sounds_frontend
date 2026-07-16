import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { authService, userService } from '../services/api';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // true on mount while we check session
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return { ...state, isLoading: false, isAuthenticated: true, user: action.payload, error: null };
    case 'AUTH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'SESSION_CHECKED':
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = useCallback(async () => {
    try {
      const data = await authService.getSession();

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: data.user,
      });
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch({ type: 'SESSION_CHECKED' });
        return;
      }

      dispatch({
        type: 'AUTH_ERROR',
        payload: 'Something went wrong.',
      });
    }
  }, []);

  const login = useCallback(async (email, password) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const data = await authService.login(email, password);
      dispatch({ type: 'AUTH_SUCCESS', payload: data.user });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password.';
      dispatch({ type: 'AUTH_ERROR', payload: msg });
      return { success: false, message: msg };
    }
  }, []);

  const signup = useCallback(async (data) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const res = await authService.signup(data);
      dispatch({ type: 'AUTH_SUCCESS', payload: res.user });
      return { success: true };
    } catch (err) {
      const errors = err.response?.data?.errors || {};
      const msg = err.response?.data?.message || 'Signup failed. Please try again.';
      dispatch({ type: 'AUTH_ERROR', payload: msg });
      return { success: false, message: msg, errors };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Always clear local state even if request fails
    }
    dispatch({ type: 'LOGOUT' });
  }, []);

  const updateUser = useCallback(async (data) => {
    try {
      const res = await userService.updateProfile(data);
      dispatch({ type: 'UPDATE_USER', payload: res });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Update failed.' };
    }
  }, []);

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    signup,
    logout,
    updateUser,
    checkSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}