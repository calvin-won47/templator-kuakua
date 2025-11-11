
import React from 'react';
import { Check } from 'lucide-react';
import { useConfig } from '../contexts/ConfigContext';

const Pricing: React.FC = () => {
  const cfg = useConfig();
  const pricingCfg = cfg?.extra?.pricing;
  const title = pricingCfg?.title || '选择适合你的方案';
  const subtitle = pricingCfg?.subtitle || '我们提供免费版和专业版，满足你的不同需求';
  const plans = pricingCfg?.plans || [
    {
      name: '免费版',
      description: '适合偶尔使用的用户',
      price: '¥0',
      period: '/永久',
      features: ['每天 3 次免费使用', '标准夸夸模型'],
      ctaText: '立即开始',
      highlighted: false,
    },
    {
      name: '专业版',
      badge: '推荐',
      description: '适合需要更多功能的用户',
      price: '¥19.9',
      period: '/月',
      features: ['无限次使用', '所有夸夸模型', '更快的响应速度', '优先体验新功能'],
      ctaText: '升级 Pro',
      highlighted: true,
    },
  ];
  const freePlan = plans[0];
  const proPlan = plans[1] || plans[0];
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">{title}</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className={freePlan.highlighted ? 'rounded-lg border-2 border-purple-500 bg-white p-8 shadow-lg flex flex-col' : 'rounded-lg border bg-white p-8 shadow-sm flex flex-col'}>
            <h3 className="text-2xl font-bold text-gray-900">{freePlan.name}</h3>
            <p className="mt-2 text-gray-500">{freePlan.description}</p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-gray-900">{freePlan.price}</span>
              <span className="text-lg font-medium text-gray-500">{freePlan.period}</span>
            </div>
            <ul className="mt-8 space-y-4 flex-grow">
              {(freePlan.features || []).map((f: string, i: number) => (
                <li key={i} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className={freePlan.highlighted ? 'mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-8 text-sm font-medium text-white shadow-lg transition-transform duration-200 hover:scale-105' : 'mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800'}
            >
              {freePlan.ctaText || '立即开始'}
            </a>
          </div>

          {/* Pro Plan */}
          <div className={proPlan.highlighted ? 'rounded-lg border-2 border-purple-500 bg-white p-8 shadow-lg flex flex-col relative' : 'rounded-lg border bg-white p-8 shadow-sm flex flex-col'}>
            {proPlan.badge ? (
              <div className="absolute top-0 right-4 -mt-3 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {proPlan.badge}
              </div>
            ) : null}
            <h3 className="text-2xl font-bold text-gray-900">{proPlan.name}</h3>
            <p className="mt-2 text-gray-500">{proPlan.description}</p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-gray-900">{proPlan.price}</span>
              <span className="text-lg font-medium text-gray-500">{proPlan.period}</span>
            </div>
            <ul className="mt-8 space-y-4 flex-grow">
              {(proPlan.features || []).map((f: string, i: number) => (
                <li key={i} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className={proPlan.highlighted ? 'mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-8 text-sm font-medium text-white shadow-lg transition-transform duration-200 hover:scale-105' : 'mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800'}
            >
              {proPlan.ctaText || '升级 Pro'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
  