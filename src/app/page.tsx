"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import BrandsSection from '@/components/sections/BrandsSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PricingSection from '@/components/sections/PricingSection';
import Script from 'next/script';
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111]">
      <Header />
      
      <HeroSection />
      
      <BrandsSection />
      
      <FeaturesSection />
      
      <BenefitsSection />
      
      <TestimonialsSection />
      
      <PricingSection />
      
      <Footer />

    </main>
  );
}
