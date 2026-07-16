import { useState, useEffect, useCallback, useRef } from 'react';
import { searchService } from '../services/api';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ products: [], categories: [], brands: [] });
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef(null);

  const search = useCallback((q) => {
    setQuery(q);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!q || q.trim().length < 2) {
      setResults({ products: [], categories: [], brands: [] });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await searchService.suggestions(q.trim());
        setResults({
          products: data.products || [],
          categories: data.categories || [],
          brands: data.brands || [],
        });
      } catch {
        setResults({ products: [], categories: [], brands: [] });
      } finally {
        setIsSearching(false);
      }
    }, 300);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults({ products: [], categories: [], brands: [] });
    setIsSearching(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const hasResults =
    results.products.length > 0 ||
    results.categories.length > 0 ||
    results.brands.length > 0;

  return { query, results, isSearching, hasResults, search, clearSearch };
}