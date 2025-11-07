
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto px-4 md:px-6 py-20 md:py-32">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl">
              夸夸一下，立马开心
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl mx-auto lg:mx-0">
              用 AI 夸夸，帮你摆脱内耗，获得情绪价值
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
            <a
              href="#"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-8 text-sm font-medium text-white shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            >
              立即体验
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://kuakua.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero.e5a5a77c.png&w=1920&q=75"
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
  