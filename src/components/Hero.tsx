
import React from 'react';
import { useConfig } from '../contexts/ConfigContext';

const Hero: React.FC = () => {
  const cfg = useConfig();
  const title = cfg?.slogan || cfg?.hero_title || '夸夸一下，立马开心';
  const description = cfg?.description || cfg?.hero_description || '用 AI 夸夸，帮你摆脱内耗，获得情绪价值';
  const ctaText = cfg?.hero_cta_text || '立即体验';
  const imageUrl = cfg?.hero_image_url || 'https://placehold.co/550x550/png';
  return (
    <section className="container mx-auto px-4 md:px-6 py-20 md:py-32">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl mx-auto lg:mx-0">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
            <a
              href="#"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-8 text-sm font-medium text-white shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            >
              {ctaText}
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={imageUrl}
            alt="Hero App Screenshot"
            className="overflow-hidden rounded-xl object-cover"
            width="550"
            height="550"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
  