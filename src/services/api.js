/**
 * Maecky Sounds — API Service Layer
 * All HTTP calls to the Django backend go through this file.
 * Base URL is read from VITE_API_BASE_URL environment variable.
 */

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// ── Axios Instance ─────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Required for HttpOnly JWT cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── CSRF Helper ────────────────────────────────────────────────────────────
function getCSRFToken() {
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='));
  return match ? match.split('=')[1] : null;
}

// ── Request Interceptor — attach CSRF token ────────────────────────────────
api.interceptors.request.use(config => {
  const mutatingMethods = ['post', 'put', 'patch', 'delete'];
  if (mutatingMethods.includes(config.method?.toLowerCase())) {
    const csrf = getCSRFToken();
    if (csrf) config.headers['X-CSRFToken'] = csrf;
  }
  return config;
});

// ── Response Interceptor — auto token refresh on 401 ──────────────────────
let isRefreshing = false;
let failedQueue = [];

function processQueue(error) {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes('/auth/token/refresh/') &&
        !originalRequest.url.includes('/auth/login/') &&
        !originalRequest.url.includes('/auth/session/')
      ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post('/auth/token/refresh/');
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // Refresh failed — redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ── Auth Service ───────────────────────────────────────────────────────────
export const authService = {
  async signup(data) {
    const res = await api.post('/auth/signup/', data);
    return res.data;
  },

  async login(email, password) {
    const res = await api.post('/auth/login/', { email, password });
    return res.data;
  },

  async logout() {
    const res = await api.post('/auth/logout/');
    return res.data;
  },

  async refreshToken() {
    const res = await api.post('/auth/token/refresh/');
    return res.data;
  },

  async getSession() {
    const res = await api.get('/auth/session/');
    return res.data;
  },

  async changePassword(oldPassword, newPassword, newPassword2) {
    const res = await api.post('/auth/password/change/', {
      old_password: oldPassword,
      new_password: newPassword,
      new_password2: newPassword2,
    });
    return res.data;
  },

  async requestPasswordReset(email) {
    const res = await api.post('/auth/password/reset/', { email });
    return res.data;
  },

  async confirmPasswordReset(uid, token, newPassword, newPassword2) {
    const res = await api.post('/auth/password/reset/confirm/', {
      uid,
      token,
      new_password: newPassword,
      new_password2: newPassword2,
    });
    return res.data;
  },

  getGoogleAuthUrl() {
    return `${BASE_URL.replace('/api/v1', '')}/accounts/google/login/`;
  },
};

// ── User / Profile Service ─────────────────────────────────────────────────
export const userService = {
  async getProfile() {
    const res = await api.get('/users/me/');
    return res.data;
  },

  async updateProfile(data) {
    const res = await api.patch('/users/me/', data);
    return res.data;
  },

  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await api.post('/users/me/avatar/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  async getAddresses() {
    const res = await api.get('/users/me/addresses/');
    return res.data;
  },

  async createAddress(data) {
    const res = await api.post('/users/me/addresses/', data);
    return res.data;
  },

  async updateAddress(id, data) {
    const res = await api.put(`/users/me/addresses/${id}/`, data);
    return res.data;
  },

  async deleteAddress(id) {
    const res = await api.delete(`/users/me/addresses/${id}/`);
    return res.data;
  },

  async setDefaultAddress(id) {
    const res = await api.patch(`/users/me/addresses/${id}/set-default/`);
    return res.data;
  },
};

// ── Product Service ────────────────────────────────────────────────────────
export const productService = {
  async getAll(params = {}) {
    const res = await api.get('/products/', { params });
    return res.data;
  },

  async getById(slug) {
    const res = await api.get(`/products/${slug}/`);
    return res.data;
  },

  async getFeatured() {
    const res = await api.get('/products/featured/');
    return res.data;
  },

  async getNewArrivals() {
    const res = await api.get('/products/new-arrivals/');
    return res.data;
  },

  async getOnSale(params = {}) {
    const res = await api.get('/products/on-sale/', { params });
    return res.data;
  },

  async getBestsellers() {
    const res = await api.get('/products/bestsellers/');
    return res.data;
  },

  async getRelated(slug) {
    const res = await api.get(`/products/${slug}/related/`);
    return res.data;
  },

  async incrementView(slug) {
    try {
      await api.post(`/products/${slug}/view/`);
    } catch {
      // Non-critical — fail silently
    }
  },
};

// ── Category Service ───────────────────────────────────────────────────────
export const categoryService = {
  async getAll() {
    const res = await api.get('/categories/');
    return res.data;
  },

  async getBySlug(slug) {
    const res = await api.get(`/categories/${slug}/`);
    return res.data;
  },

  async getCategoryProducts(slug, params = {}) {
    const res = await api.get(`/categories/${slug}/products/`, { params });
    return res.data;
  },
};

// ── Brand Service ──────────────────────────────────────────────────────────
export const brandService = {
  async getAll() {
    const res = await api.get('/brands/');
    return res.data;
  },

  async getBrandProducts(slug, params = {}) {
    const res = await api.get(`/brands/${slug}/products/`, { params });
    return res.data;
  },
};

// ── Search Service ─────────────────────────────────────────────────────────
export const searchService = {
  async search(query, params = {}) {
    const res = await api.get('/search/', { params: { q: query, ...params } });
    return res.data;
  },

  async suggestions(query) {
    const res = await api.get('/search/suggestions/', { params: { q: query } });
    return res.data;
  },
};

// ── Cart Service ───────────────────────────────────────────────────────────
export const cartService = {
  async getCart() {
    const res = await api.get('/cart/');
    return res.data;
  },

  async addItem(productId, quantity = 1, variantId = null) {
    const payload = { product_id: productId, quantity };
    if (variantId) payload.variant_id = variantId;
    const res = await api.post('/cart/items/', payload);
    return res.data;
  },

  async updateItem(itemId, quantity) {
    const res = await api.patch(`/cart/items/${itemId}/`, { quantity });
    return res.data;
  },

  async removeItem(itemId) {
    const res = await api.delete(`/cart/items/${itemId}/`);
    return res.data;
  },

  async clearCart() {
    const res = await api.delete('/cart/clear/');
    return res.data;
  },

  async applyCoupon(code) {
    const res = await api.post('/cart/coupon/apply/', { code });
    return res.data;
  },

  async removeCoupon() {
    const res = await api.delete('/cart/coupon/remove/');
    return res.data;
  },

  async getSummary() {
    const res = await api.get('/cart/summary/');
    return res.data;
  },

  async mergeGuestCart(sessionKey) {
    const res = await api.post('/cart/merge/', { session_key: sessionKey });
    return res.data;
  },
};

// ── Order Service ──────────────────────────────────────────────────────────
export const orderService = {
  async placeOrder(data) {
    const res = await api.post('/orders/', data);
    return res.data;
  },

  async getOrders(params = {}) {
    const res = await api.get('/orders/history/', { params });
    return res.data;
  },

  async getOrderByNumber(orderNumber) {
    const res = await api.get(`/orders/${orderNumber}/`);
    return res.data;
  },

  async cancelOrder(orderNumber) {
    const res = await api.post(`/orders/${orderNumber}/cancel/`);
    return res.data;
  },
};

// ── Payment Service ────────────────────────────────────────────────────────
export const paymentService = {
  async initiateMpesa(orderId, phone) {
    const res = await api.post('/payments/mpesa/initiate/', {
      order_id: orderId,
      phone,
    });
    return res.data;
  },

  async checkMpesaStatus(checkoutRequestId) {
    const res = await api.get(`/payments/mpesa/status/${checkoutRequestId}/`);
    return res.data;
  },

  async initiateStripe(orderId) {
    const res = await api.post('/payments/stripe/initiate/', {
      order_id: orderId,
    });
    return res.data;
  },

  async confirmStripe(paymentIntentId, orderId) {
    const res = await api.post('/payments/stripe/confirm/', {
      payment_intent_id: paymentIntentId,
      order_id: orderId,
    });
    return res.data;
  },

  async getPaymentStatus(paymentId) {
    const res = await api.get(`/payments/${paymentId}/status/`);
    return res.data;
  },
};

// ── Review Service ─────────────────────────────────────────────────────────
export const reviewService = {
  async getProductReviews(slug, params = {}) {
    const res = await api.get(`/reviews/products/${slug}/`, { params });
    return res.data;
  },

  async getReviewSummary(slug) {
    const res = await api.get(`/reviews/products/${slug}/summary/`);
    return res.data;
  },

  async createReview(slug, data) {
    const res = await api.post(`/reviews/products/${slug}/`, data);
    return res.data;
  },

  async updateReview(reviewId, data) {
    const res = await api.patch(`/reviews/${reviewId}/`, data);
    return res.data;
  },

  async deleteReview(reviewId) {
    const res = await api.delete(`/reviews/${reviewId}/`);
    return res.data;
  },

  async markHelpful(reviewId, helpful = true) {
    const res = await api.post(`/reviews/${reviewId}/helpful/`, { helpful });
    return res.data;
  },
};

// ── Wishlist Service ───────────────────────────────────────────────────────
export const wishlistService = {
  async getWishlist() {
    const res = await api.get('/wishlist/');
    return res.data;
  },

  async addToWishlist(productId) {
    const res = await api.post('/wishlist/add/', { product_id: productId });
    return res.data;
  },

  async removeFromWishlist(productId) {
    const res = await api.delete(`/wishlist/${productId}/`);
    return res.data;
  },

  async toggleWishlist(productId) {
    const res = await api.post('/wishlist/toggle/', { product_id: productId });
    return res.data;
  },

  async moveToCart() {
    const res = await api.post('/wishlist/move-to-cart/');
    return res.data;
  },
};

// ── Coupon Service ─────────────────────────────────────────────────────────
export const couponService = {
  async validate(code) {
    const res = await api.post('/coupons/validate/', { code });
    return res.data;
  },
};

// ── Newsletter Service ─────────────────────────────────────────────────────
export const newsletterService = {
  async subscribe(email) {
    // Newsletter subscription hits the user profile update endpoint
    const res = await api.post('/auth/signup/', {
      email,
      newsletter_subscribed: true,
    });
    return res.data;
  },
};

// ── Blog Service ───────────────────────────────────────────────────────────
export const blogService = {
  async getAll(params = {}) {
    const res = await api.get('/blog/', { params });
    return res.data;
  },

  async getBySlug(slug) {
    const res = await api.get(`/blog/${slug}/`);
    return res.data;
  },

  async getCategories() {
    const res = await api.get('/blog/categories/');
    return res.data;
  },

  async getCategoryPosts(slug, params = {}) {
    const res = await api.get(`/blog/categories/${slug}/`, { params });
    return res.data;
  },

  async getFeatured() {
    const res = await api.get('/blog/', { params: { is_featured: true } });
    return res.data;
  },

  async getRelated(postId) {
    // Backend returns related posts inside the post detail response
    const res = await api.get(`/blog/`);
    return res.data;
  },
};

// ── Analytics Service (Admin only) ────────────────────────────────────────
export const analyticsService = {
  async getDashboard() {
    const res = await api.get('/admin/analytics/dashboard/');
    return res.data;
  },

  async getSalesReport(params = {}) {
    const res = await api.get('/admin/analytics/sales/', { params });
    return res.data;
  },

  async getTopProducts(params = {}) {
    const res = await api.get('/admin/analytics/products/top/', { params });
    return res.data;
  },

  async getLowStockReport() {
    const res = await api.get('/admin/analytics/inventory/low-stock/');
    return res.data;
  },
};

export default api;