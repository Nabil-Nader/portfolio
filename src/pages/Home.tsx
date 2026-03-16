import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { TechStack } from '@/components/sections/TechStack';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';

export const Home: React.FC = () => {
  return (
    <>
      <div className="grid-bg" />
      <Navbar />
      <ScrollProgress />
      
      <main>
        <Hero />
        <About />
        <TechStack />
        <CaseStudies />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
};
