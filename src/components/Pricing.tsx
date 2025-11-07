
import React from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">选择适合你的方案</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              我们提供免费版和专业版，满足你的不同需求
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="rounded-lg border bg-white p-8 shadow-sm flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900">免费版</h3>
            <p className="mt-2 text-gray-500">适合偶尔使用的用户</p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-gray-900">¥0</span>
              <span className="text-lg font-medium text-gray-500">/永久</span>
            </div>
            <ul className="mt-8 space-y-4 flex-grow">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>每天 3 次免费使用</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>标准夸夸模型</span>
              </li>
            </ul>
            <a
              href="#"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800"
            >
              立即开始
            </a>
          </div>

          {/* Pro Plan */}
          <div className="rounded-lg border-2 border-purple-500 bg-white p-8 shadow-lg flex flex-col relative">
            <div className="absolute top-0 right-4 -mt-3 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              推荐
            </div>
            <h3 className="text-2xl font-bold text-gray-900">专业版</h3>
            <p className="mt-2 text-gray-500">适合需要更多功能的用户</p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-gray-900">¥19.9</span>
              <span className="text-lg font-medium text-gray-500">/月</span>
            </div>
            <ul className="mt-8 space-y-4 flex-grow">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>无限次使用</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>所有夸夸模型</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>更快的响应速度</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>优先体验新功能</span>
              </li>
            </ul>
            <a
              href="#"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-8 text-sm font-medium text-white shadow-lg transition-transform duration-200 hover:scale-105"
            >
              升级 Pro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
  