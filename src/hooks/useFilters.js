import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService, categoryService } from '../services/api';

const DEFAULT_FILTERS = {
  brands: [],
  minPrice: 0,
  maxPrice: 500000,
  inStock: false,
  conditions: [],
  minRating: 0,
  sortBy: 'popular',
};

export function useFilters(categorySlug = null) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const fetchRef = useRef(null);

  // Build API params from filter state
  const buildParams = useCallback((f = filters) => {
    const params = {};
    if (f.brands.length > 0) params.brand = f.brands.join(',');
    if (f.minPrice > 0) params.min_price = f.minPrice;
    if (f.maxPrice < 500000) params.max_price = f.maxPrice;
    if (f.inStock) params.in_stock = true;
    if (f.minRating > 0) params.rating = f.minRating;
    if (f.conditions.length > 0) params.condition = f.conditions.join(',');
    params.ordering = {
      popular: '-total_sold',
      newest: '-created_at',
      'price-asc': 'price',
      'price-desc': '-price',
      rating: '-average_rating',
    }[f.sortBy] || '-total_sold';
    return params;
  }, [filters]);

  const fetchProducts = useCallback(async (f = filters) => {
    setLoading(true);
    try {
      const params = buildParams(f);
      let data;

      if (categorySlug) {
        data = await categoryService.getCategoryProducts(categorySlug, params);
      } else {
        data = await productService.getAll(params);
      }

      setFilteredProducts(data.results || data);
      setPagination({
        count: data.count,
        totalPages: data.total_pages,
        currentPage: data.current_page,
        next: data.next,
        previous: data.previous,
      });
    } catch {
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, [categorySlug, buildParams, filters]);

  // Fetch when filters or category change
  useEffect(() => {
    if (fetchRef.current) clearTimeout(fetchRef.current);
    fetchRef.current = setTimeout(() => fetchProducts(filters), 200);
    return () => clearTimeout(fetchRef.current);
  }, [filters, categorySlug]);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleBrand = useCallback((brand) => {
    setFilters(prev => {
      const brands = prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands };
    });
  }, []);

  const toggleCondition = useCallback((condition) => {
    setFilters(prev => {
      const conditions = prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition];
      return { ...prev, conditions };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const setSortBy = useCallback((sort) => {
    setFilters(prev => ({ ...prev, sortBy: sort }));
  }, []);

  const activeFilterCount =
    filters.brands.length +
    filters.conditions.length +
    (filters.inStock ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 500000 ? 1 : 0);

  return {
    filters,
    filteredProducts,
    availableBrands,
    loading,
    pagination,
    activeFilterCount,
    updateFilter,
    toggleBrand,
    toggleCondition,
    clearFilters,
    setSortBy,
    fetchProducts,
  };
}