
import React from 'react';
import { useConfig } from '../contexts/ConfigContext';

const Footer: React.FC = () => {
  const cfg = useConfig();
  const siteName = cfg?.siteIdentity?.name || cfg?.app_name || 'kuakua';
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <a href="#" className="text-2xl font-extrabold tracking-tight text-gray-900">
              {siteName}
            </a>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">服务条款</a>
            <a href="#" className="hover:text-gray-900">隐私政策</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {year} {siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  