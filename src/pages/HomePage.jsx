import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoBanner from '../components/home/PromoBanner';
import NewArrivals from '../components/home/NewArrivals';
import BrandLogos from '../components/home/BrandLogos';
import NewsletterSection from '../components/home/NewsletterSection';

export default function HomePage() {
  return (
    <PageWrapper flush>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoBanner />
      <NewArrivals />
      <BrandLogos />
      <NewsletterSection />
    </PageWrapper>
  );
}