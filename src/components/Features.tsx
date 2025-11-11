
import React from 'react';
import { useConfig } from '../contexts/ConfigContext';

interface FeatureItem {
  title: string;
  description: string;
  imageUrl?: string;
  alt?: string;
}

const defaultFeaturesData: FeatureItem[] = [
  {
    title: '多种夸夸风格',
    description: '内置多种夸夸风格，如“鼓励师”、“抬杠”、“毒舌”等，满足你的不同需求。',
    imageUrl: 'https://placehold.co/300x200/png',
    alt: 'Feature 1',
  },
  {
    title: '智能识别场景',
    description: 'AI 会智能识别你的烦恼场景，并给出更贴切的夸奖。',
    imageUrl: 'https://placehold.co/300x200/png',
    alt: 'Feature 2',
  },
  {
    title: '保护你的隐私',
    description: '我们不会存储你的任何对话内容，你的隐私将得到充分保护。',
    imageUrl: 'https://placehold.co/300x200/png',
    alt: 'Feature 3',
  },
];

const Features: React.FC = () => {
  const cfg = useConfig();
  const featuresCfg = cfg?.extra?.features;
  const title = featuresCfg?.title || '我们的特色';
  const subtitle = featuresCfg?.subtitle || '我们用心为你打造最好的夸夸体验';
  const featuresData: FeatureItem[] = Array.isArray(featuresCfg?.items) && featuresCfg.items.length
    ? (featuresCfg.items as FeatureItem[])
    : defaultFeaturesData;
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
        <div className="grid gap-8 md:grid-cols-3">
          {featuresData.map((feature: FeatureItem, index: number) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={feature.imageUrl || 'https://placehold.co/300x200/png'}
                alt={feature.alt || feature.title}
                className="mb-4 rounded-lg object-cover w-full h-auto"
                width="300"
                height="200"
              />
              <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-500 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
  