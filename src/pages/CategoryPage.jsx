import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { C, FONTS } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';
import Breadcrumb from '../components/ui/Breadcrumb';
import Sidebar from '../components/layout/Sidebar';
import ProductGrid from '../components/product/ProductGrid';
import { useFilters } from '../hooks/useFilters';
import Select from '../components/ui/Select';

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function CategoryPage() {
  const { categoryId } = useParams();
    console.log("categoryId:", categoryId);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  
  const {
    filters,
    filteredProducts,
    activeFilterCount,
    availableBrands,
    updateFilter,
    toggleBrand,
    toggleCondition,
    clearFilters,
    setSortBy,
  } = useFilters(categoryId);

  const category = {
    name: categoryId,
  };

  const categoryName = category?.name || null;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/category/guitars' },
    ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
  ];

  return (
    <PageWrapper>
      {/* Page hero */}
      <div style={{ padding: '40px 0 32px', background: C.surface, borderBottom: `1px solid ${C.border}` }}>
        <div className="container">
          <Breadcrumb items={breadcrumbs} style={{ marginBottom: '12px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <h1 style={{
              fontFamily: FONTS.display, fontWeight: 800,
              fontSize: 'clamp(24px, 4vw, 38px)', letterSpacing: '-0.02em', color: C.text,
            }}>
              {category?.name || 'All Instruments'}
            </h1>
            <span style={{
              background: C.amberLo, border: `1px solid rgba(232,135,26,0.3)`,
              borderRadius: '99px', padding: '4px 12px', fontSize: '13px', color: C.amber, fontWeight: 600,
            }}>
              {filteredProducts.length} products
            </span>
          </div>
          {category?.description && (
            <p style={{ fontSize: '15px', color: C.textMid, marginTop: '8px', maxWidth: '600px' }}>
              {category.description}
            </p>
          )}
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
            {/* Sidebar */}
            <Sidebar
              filters={filters}
              availableBrands={availableBrands}
              updateFilter={updateFilter}
              toggleBrand={toggleBrand}
              toggleCondition={toggleCondition}
              clearFilters={clearFilters}
              mobileOpen={mobileFiltersOpen}
              onMobileClose={() => setMobileFiltersOpen(false)}
            />

            {/* Main */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Toolbar */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '20px', gap: '12px', flexWrap: 'wrap',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Mobile filter trigger */}
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    style={{
                      display: 'none', alignItems: 'center', gap: '6px',
                      background: C.card, border: `1px solid ${C.border}`,
                      borderRadius: '8px', padding: '8px 14px', fontSize: '14px',
                      fontWeight: 600, color: C.text, cursor: 'pointer', fontFamily: FONTS.body,
                    }}
                    className="mobile-filter-btn"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="10" y2="18" />
                    </svg>
                    Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                  </button>

                  <span style={{ fontSize: '14px', color: C.textMid }}>
                    {filteredProducts.length} results
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* View mode toggles */}
                  <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
                    {['grid', 'list'].map(mode => (
                      <button key={mode} onClick={() => setViewMode(mode)} style={{
                        padding: '7px 10px', background: viewMode === mode ? C.amberLo : C.card,
                        border: 'none', color: viewMode === mode ? C.amber : C.textMid,
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}>
                        {mode === 'grid'
                          ? <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                          : <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                        }
                      </button>
                    ))}
                  </div>

                  <Select
                    value={filters.sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    options={SORT_OPTIONS}
                    fullWidth={false}
                    selectStyle={{ fontSize: '14px', padding: '8px 36px 8px 12px', minWidth: '180px' }}
                  />
                </div>
              </div>

              {/* Active filter chips */}
              {activeFilterCount > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {filters.brands.map(brand => (
                    <span key={brand} onClick={() => toggleBrand(brand)} style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      background: C.amberLo, border: `1px solid rgba(232,135,26,0.3)`,
                      borderRadius: '99px', padding: '4px 12px', fontSize: '13px',
                      color: C.amber, cursor: 'pointer',
                    }}>
                      {brand} ×
                    </span>
                  ))}
                  {filters.inStock && (
                    <span onClick={() => updateFilter('inStock', false)} style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      background: C.amberLo, border: `1px solid rgba(232,135,26,0.3)`,
                      borderRadius: '99px', padding: '4px 12px', fontSize: '13px',
                      color: C.amber, cursor: 'pointer',
                    }}>
                      In Stock ×
                    </span>
                  )}
                  <button onClick={clearFilters} style={{
                    background: 'none', border: 'none', fontSize: '13px', color: C.textLo,
                    cursor: 'pointer', padding: '4px 8px', fontFamily: FONTS.body,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = C.error}
                  onMouseLeave={e => e.currentTarget.style.color = C.textLo}
                  >
                    Clear all
                  </button>
                </div>
              )}

              <ProductGrid
                products={filteredProducts}
                viewMode={viewMode}
                columns={3}
                onClearFilters={clearFilters}
                emptyTitle="No products match your filters"
                emptyMessage="Try adjusting or removing some filters to see more products."
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mobile-filter-btn { display: flex !important; }
        }
      `}</style>
    </PageWrapper>
  );
}