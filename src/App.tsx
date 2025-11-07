
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import { BlogList, BlogDetail } from './pages';

const HomeContent: React.FC = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
    </>
  );
};

const App: React.FC = () => {
  return (
    <div className="bg-grid min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-6">
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
  