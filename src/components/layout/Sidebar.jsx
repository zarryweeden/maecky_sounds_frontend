import React from 'react';
import { C, FONTS, TRANSITION } from '../../styles/tokens';
import Checkbox from '../ui/Checkbox';
import RangeSlider from '../ui/RangeSlider';
import Button from '../ui/Button';
import Drawer from '../ui/Drawer';

function FilterSection({ title, children }) {
  return (
    <div style={{
      marginBottom: '24px',
      paddingBottom: '24px',
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{
        fontFamily: FONTS.display,
        fontWeight: 700,
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: C.textMid,
        marginBottom: '14px',
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function SidebarContent({ filters, availableBrands, updateFilter, toggleBrand, toggleCondition, clearFilters }) {
  return (
    <div>
      <RangeSlider
        min={0}
        max={500000}
        value={[filters.minPrice, filters.maxPrice]}
        onChange={([min, max]) => {
          updateFilter('minPrice', min);
          updateFilter('maxPrice', max);
        }}
        label="Price Range"
      />
      <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: `1px solid ${C.border}` }} />

      <FilterSection title="Brand">
        {availableBrands.slice(0, 8).map(({ brand, count }) => (
          <div key={brand} style={{ marginBottom: '8px' }}>
            <Checkbox
              label={brand}
              checked={filters.brands.includes(brand)}
              onChange={() => toggleBrand(brand)}
              count={count}
            />
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Condition">
        {['New', 'Used', 'Refurbished'].map(c => (
          <div key={c} style={{ marginBottom: '8px' }}>
            <Checkbox
              label={c}
              checked={filters.conditions.includes(c)}
              onChange={() => toggleCondition(c)}
            />
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Rating">
        {[4, 3, 2].map(r => (
          <div
            key={r}
            onClick={() => updateFilter('minRating', filters.minRating === r ? 0 : r)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              marginBottom: '8px',
              opacity: filters.minRating > r ? 0.5 : 1,
            }}
          >
            <div style={{
              width: '14px',
              height: '14px',
              borderRadius: '4px',
              border: `1.5px solid ${filters.minRating === r ? C.amber : C.border}`,
              background: filters.minRating === r ? C.amber : 'transparent',
              flexShrink: 0,
              transition: TRANSITION.fast,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {filters.minRating === r && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3 5.5L8 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: C.textMid }}>
              {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} width="11" height="11" viewBox="0 0 24 24">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill={i < r ? C.amber : C.border}
                  />
                </svg>
              ))}
              <span>& Up</span>
            </div>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Availability">
        <Checkbox
          label="In Stock Only"
          checked={filters.inStock}
          onChange={() => updateFilter('inStock', !filters.inStock)}
        />
      </FilterSection>

      <Button
        variant="ghost"
        size="sm"
        fullWidth
        onClick={clearFilters}
        style={{ marginTop: '8px' }}
      >
        Clear All Filters
      </Button>
    </div>
  );
}

export default function Sidebar({
  filters,
  availableBrands,
  updateFilter,
  toggleBrand,
  toggleCondition,
  clearFilters,
  mobileOpen,
  onMobileClose,
}) {
  const sidebarProps = { filters, availableBrands, updateFilter, toggleBrand, toggleCondition, clearFilters };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        style={{
          width: '280px',
          flexShrink: 0,
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: '12px',
          padding: '24px',
          position: 'sticky',
          top: '80px',
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto',
        }}
        className="desktop-sidebar"
      >
        <SidebarContent {...sidebarProps} />
      </aside>

      {/* Mobile drawer */}
      <Drawer
        isOpen={mobileOpen}
        onClose={onMobileClose}
        title="Filter Products"
        side="left"
        width="min(320px, 95vw)"
      >
        <SidebarContent {...sidebarProps} />
      </Drawer>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-sidebar { display: none !important; }
        }
      `}</style>
    </>
  );
}