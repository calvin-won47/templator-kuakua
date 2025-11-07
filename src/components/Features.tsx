
import React from 'react';

const featuresData = [
  {
    title: '多种夸夸风格',
    description: '内置多种夸夸风格，如“鼓励师”、“抬杠”、“毒舌”等，满足你的不同需求。',
    imageUrl: 'https://kuakua.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-1.76c724ba.png&w=1080&q=75',
    alt: 'Feature 1',
  },
  {
    title: '智能识别场景',
    description: 'AI 会智能识别你的烦恼场景，并给出更贴切的夸奖。',
    imageUrl: 'https://kuakua.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-2.3737b1cb.png&w=1080&q=75',
    alt: 'Feature 2',
  },
  {
    title: '保护你的隐私',
    description: '我们不会存储你的任何对话内容，你的隐私将得到充分保护。',
    imageUrl: 'https://kuakua.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-3.93508529.png&w=1080&q=75',
    alt: 'Feature 3',
  },
];

const Features: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">我们的特色</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              我们用心为你打造最好的夸夸体验
            </p>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {featuresData.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={feature.imageUrl}
                alt={feature.alt}
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
  