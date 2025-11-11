
import React from 'react';
import { useConfig } from '../contexts/ConfigContext';

const testimonialsData = [
  {
    name: '匿名用户',
    text: '夸夸太好用了，每次不开心的时候，都会来这里夸一夸，心情立马就好了。',
    avatarUrl: 'https://i.pravatar.cc/48?u=1',
  },
  {
    name: '匿名用户',
    text: '夸夸的 AI 很智能，能够理解我的烦恼，并给出很贴切的夸奖。',
    avatarUrl: 'https://i.pravatar.cc/48?u=2',
  },
  {
    name: '匿名用户',
    text: '我最喜欢毒舌模式，每次都能把我逗笑，哈哈哈哈。',
    avatarUrl: 'https://i.pravatar.cc/48?u=3',
  },
  {
    name: '匿名用户',
    text: '夸夸的界面很简洁，用起来很舒服，没有乱七八糟的东西。',
    avatarUrl: 'https://i.pravatar.cc/48?u=4',
  },
  {
    name: '匿名用户',
    text: '夸夸的隐私保护做得很好，让我很放心。',
    avatarUrl: 'https://i.pravatar.cc/48?u=5',
  },
  {
    name: '匿名用户',
    text: '夸夸的免费版就很好用，Pro 版的功能更强大，我已经升级了。',
    avatarUrl: 'https://i.pravatar.cc/48?u=6',
  },
];

const Testimonials: React.FC = () => {
  const cfg = useConfig();
  const tCfg = cfg?.extra?.testimonials;
  const title = tCfg?.title || '听听大家怎么说';
  const subtitle = tCfg?.subtitle || '我们已经收到了很多用户的好评';
  const items = tCfg?.items?.length ? tCfg.items : testimonialsData;
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white border-y border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">{title}</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((testimonial: { name: string; text: string; avatarUrl?: string }, index: number) => (
            <div key={index} className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatarUrl || 'https://i.pravatar.cc/48'}
                  alt={`Avatar of ${testimonial.name}`}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
  