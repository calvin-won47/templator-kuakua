
import React from 'react';
import { MessageSquare, BrainCircuit, Share2 } from 'lucide-react';

const steps = [
  {
    icon: <MessageSquare className="h-10 w-10 text-custom-purple" />,
    title: '写下你的烦恼',
    description: '无论任何烦恼，都可以向 AI 诉说，我们会认真倾听。',
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-custom-purple" />,
    title: 'AI 分析并夸夸你',
    description: 'AI 会分析你的烦恼，并从多个角度、多个方面来夸奖你。',
  },
  {
    icon: <Share2 className="h-10 w-10 text-custom-purple" />,
    title: '分享或再次夸夸',
    description: '你可以将夸夸内容分享给朋友，或者再次向 AI 夸夸。',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white border-y border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">如何使用</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              简单三步，让你立马开心
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
          {steps.map((step, index) => (
            <div key={index} className="grid gap-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                {step.icon}
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
  