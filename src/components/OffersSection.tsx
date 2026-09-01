import React, { useState } from 'react';
import { Tag, Sparkles, Check, Copy, Clock, Gift, Percent, ArrowRight } from 'lucide-react';
import { SPECIAL_OFFERS } from '../data/bakeryData';

interface OffersSectionProps {
  onApplyCoupon: (code: string) => void;
  onOrderNow: () => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onApplyCoupon, onOrderNow }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    onApplyCoupon(code);
    setCopiedCode(code);
    navigator.clipboard?.writeText(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="offers-section" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 1. HERO PROMO BANNER (Exact replicate from mockup) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B1938] via-[#102450] to-[#0B1938] text-white shadow-xl">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-10 relative z-10">
            
            {/* Left promo info */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-serif italic border border-amber-400/30">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>Limited Time Offer</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Flat 15% OFF
              </h3>
              
              <p className="text-sm sm:text-base text-gray-200 font-medium">
                On All Cakes, Pastries & Handcrafted Desserts
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOrderNow}
                  className="bg-[#D91A2A] hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  Order Now
                </button>

                <button
                  onClick={() => handleCopyCode('SWEET15')}
                  className="bg-white/10 hover:bg-white/20 border border-white/30 text-amber-300 font-bold text-xs uppercase px-4 py-3 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                >
                  {copiedCode === 'SWEET15' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Code SWEET15 Applied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Use Code: SWEET15</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right promo cake image with 15% OFF badge */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative max-w-sm sm:max-w-md rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80"
                  alt="Delicious Chocolate Fudge Cake"
                  className="w-full h-56 sm:h-64 object-cover"
                />
                
                {/* 15% OFF circular badge over photo */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white text-[#0B1938] flex flex-col items-center justify-center shadow-xl border-2 border-amber-400">
                  <span className="text-base font-black leading-none">15%</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500">OFF</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. SPECIAL OFFERS & DEALS GRID */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-serif italic text-amber-700 block mb-1">Exclusive Value Packages</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1938]">
              Festive Deals & Sweet Combos
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SPECIAL_OFFERS.map((deal) => (
              <div
                key={deal.id}
                className="bg-[#FAF7F2] rounded-2xl p-4 border border-amber-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 rounded-xl overflow-hidden mb-3">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover"
                    />
                    {deal.badge && (
                      <span className="absolute top-2 left-2 bg-[#D91A2A] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                        {deal.badge}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-bold uppercase text-amber-700 block">
                    {deal.category}
                  </span>
                  <h4 className="font-extrabold text-sm text-[#0B1938] mt-0.5 line-clamp-1">
                    {deal.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {deal.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-amber-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Coupon Code:</span>
                    <span className="text-xs font-mono font-bold text-[#0B1938]">
                      {deal.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(deal.code)}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white hover:bg-[#0B1938] hover:text-white border border-gray-300 text-[#0B1938] transition-colors cursor-pointer"
                  >
                    {copiedCode === deal.code ? 'Applied ✓' : 'Apply'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
