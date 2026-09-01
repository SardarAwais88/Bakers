import React from 'react';
import { Truck, PackageCheck, ShoppingBag, Headphones, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: <Truck className="w-6 h-6 text-[#D91A2A]" />,
      title: 'Same Day Delivery',
      description: 'Fast and reliable delivery within 45 to 90 minutes right to your doorstep.',
    },
    {
      icon: <PackageCheck className="w-6 h-6 text-amber-600" />,
      title: 'Secure Packaging',
      description: 'Elegant & insulated thermal packaging to keep cakes and desserts chilled & intact.',
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-[#0B1938]" />,
      title: 'Online Ordering',
      description: 'Easy ordering with instant WhatsApp synchronization & multiple payment options.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-emerald-600" />,
      title: 'Customer Support',
      description: 'Dedicated cake consultants available 7 days a week from 9 AM to 11 PM.',
    },
  ];

  return (
    <section className="py-12 bg-[#FAF7F2]/60 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-1.5 text-amber-700 text-xs font-serif italic mb-1">
            <span>Why Choose Us?</span>
            <Sparkles className="w-3 h-3 text-amber-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1938] tracking-tight">
            We Make Moments Special
          </h2>
        </div>

        {/* 4 Cards Grid matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-sm font-extrabold text-[#0B1938] mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
