import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { C, FONTS } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';
import ProductGrid from '../components/product/ProductGrid';
import { productService } from '../services/api';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputVal, setInputVal] = useState(query);

  useEffect(() => {
    setLoading(true);
    setInputVal(query);
    productService.search(query).then(data => {
      setResults(data);
      setLoading(false);
    });
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputVal.trim()) navigate(`/search?q=${encodeURIComponent(inputVal.trim())}`);
  };

  return (
    <PageWrapper>
      <div style={{ padding: '48px 0 32px', background: C.surface, borderBottom: `1px solid ${C.border}` }}>
        <div className="container">
          <form onSubmit={handleSearch} style={{ maxWidth: '600px' }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: C.textMid, display: 'flex' }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="search"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                placeholder="Search instruments, brands…"
                style={{
                  width: '100%', background: C.card, border: `1px solid ${C.border}`,
                  borderRadius: '10px', padding: '14px 20px 14px 52px',
                  fontFamily: FONTS.body, fontSize: '17px', color: C.text, outline: 'none',
                }}
                onFocus={e => e.currentTarget.style.borderColor = C.amber}
                onBlur={e => e.currentTarget.style.borderColor = C.border}
              />
            </div>
          </form>
          {!loading && (
            <p style={{ marginTop: '14px', fontSize: '15px', color: C.textMid }}>
              {results.length > 0
                ? <><strong style={{ color: C.text }}>{results.length}</strong> results for "<strong style={{ color: C.text }}>{query}</strong>"</>
                : <>No results found for "<strong style={{ color: C.text }}>{query}</strong>"</>
              }
            </p>
          )}
        </div>
      </div>

      <div className="section">
        <div className="container">
          {!loading && results.length === 0 && query && (
            <div style={{ marginBottom: '32px', padding: '20px', background: C.amberLo, border: `1px solid rgba(232,135,26,0.25)`, borderRadius: '10px' }}>
              <p style={{ fontSize: '14px', color: C.amber }}>
                Did you mean to search for something else? Try different keywords or{' '}
                <button onClick={() => navigate('/category/guitars')} style={{ background: 'none', border: 'none', color: C.amber, cursor: 'pointer', fontWeight: 700, textDecoration: 'underline', fontFamily: FONTS.body }}>
                  browse all categories
                </button>.
              </p>
            </div>
          )}
          <ProductGrid
            products={results}
            loading={loading}
            columns={4}
            emptyTitle="No products found"
            emptyMessage={`We couldn't find any products matching "${query}". Try different search terms.`}
          />
        </div>
      </div>
    </PageWrapper>
  );
}