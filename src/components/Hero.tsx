import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, Sparkles, Clock, ShieldCheck, Heart, Award } from 'lucide-react';

interface HeroProps {
  onOrderNow: () => void;
  onViewMenu: () => void;
  onSelectCategory: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onViewMenu, onSelectCategory }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      badge: 'Freshly Baked, Made with Love ♡',
      headline: 'Delicious Moments',
      headlineAccent: 'Made Sweeter',
      scriptSubtitle: 'Just for You!',
      description: 'From our oven to your heart. Experience the richness of artisanal Belgian chocolate, pure dairy butter, and authentic desi ghee in every bite.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85',
      featuredTitle: 'Signature Chocolate Fudge Cake',
      featuredTag: 'Best Seller 2026',
      price: 'Rs. 2,500',
      category: 'cakes',
    },
    {
      badge: 'Tradition of 100% Pure Desi Ghee ✨',
      headline: 'Royal Traditional',
      headlineAccent: 'Mithai & Sweets',
      scriptSubtitle: 'Pure Celebrations!',
      description: 'Handcrafted Kaju Katli, Pistachio Barfi, and hot Gulab Jamun prepared with farm-fresh khoya and pure saffron for weddings and festive joys.',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=85',
      featuredTitle: 'Royal Desi Ghee Mix Mithai Box',
      featuredTag: 'Festive Favorite',
      price: 'Rs. 1,350',
      category: 'sweets',
    },
    {
      badge: 'Bespoke Custom Cake Studio 🎨',
      headline: 'Custom Dream Cakes',
      headlineAccent: 'Crafted to Perfection',
      scriptSubtitle: 'For Unforgettable Parties!',
      description: 'Bring your fantasy celebration cake to life. Share your theme or photo, choose exotic fillings, and let our master pastry artists bake pure joy.',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=85',
      featuredTitle: 'Artisan Themed Event Cakes',
      featuredTag: 'Custom Orders',
      price: 'From Rs. 2,400',
      category: 'custom-cakes',
    }
  ];

  // Auto rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const slide = heroSlides[activeSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FFFDF9] to-white border-b border-gray-100">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-100/30 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-6 space-y-5">
            {/* Script Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/70 text-amber-900 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="italic font-serif">{slide.badge}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1938] tracking-tight leading-[1.15]">
                {slide.headline}{' '}
                <span className="text-[#D91A2A]">{slide.headlineAccent}</span>
              </h1>
              <p className="text-2xl sm:text-3xl font-serif italic text-amber-700 font-medium">
                {slide.scriptSubtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg">
              {slide.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOrderNow}
                className="inline-flex items-center justify-center gap-2 bg-[#0B1938] hover:bg-[#D91A2A] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Now</span>
              </button>

              <button
                onClick={onViewMenu}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#0B1938] border border-gray-300 font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-xs hover:border-[#0B1938] transition-all duration-200 cursor-pointer"
              >
                <span>View Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slide Dots */}
            <div className="flex items-center gap-2 pt-4">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === idx
                      ? 'w-8 bg-[#D91A2A]'
                      : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#D91A2A] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">100% Pure</p>
                  <p className="text-[11px] text-gray-500">Desi Ghee & Butter</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Oven Fresh</p>
                  <p className="text-[11px] text-gray-500">Baked Daily 6 AM</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">2-Hr Delivery</p>
                  <p className="text-[11px] text-gray-500">Safe & Insulated</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SHOWCASE IMAGE */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Circular / Stand Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img
                  src={slide.image}
                  alt={slide.featuredTitle}
                  className="w-full h-80 sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient overlay on bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Overlaid Product Info Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/40 flex items-center justify-between gap-3">
                  <div>
                    <span className="inline-block bg-[#D91A2A] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md mb-1">
                      {slide.featuredTag}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-[#0B1938] line-clamp-1">
                      {slide.featuredTitle}
                    </h3>
                    <p className="text-xs text-gray-500">Handmade with premium Belgian ingredients</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-gray-400 block">Starting at</span>
                    <span className="text-base font-extrabold text-[#D91A2A]">
                      {slide.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating 15% OFF Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#D91A2A] to-rose-700 text-white rounded-2xl p-3 shadow-xl transform rotate-6 border-2 border-white animate-bounce-slow">
                <p className="text-[10px] uppercase tracking-wider font-extrabold text-amber-200">Limited Deal</p>
                <p className="text-xl font-black leading-tight">15% OFF</p>
                <p className="text-[9px] text-rose-100">Code: SWEET15</p>
              </div>

              {/* Floating Customer Rating Badge */}
              <div className="absolute -bottom-3 -left-3 bg-white rounded-xl py-2 px-3 shadow-lg border border-gray-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-black text-xs">
                  ★ 4.9
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-900">1,850+ Happy</p>
                  <p className="text-[10px] text-gray-500">Sweet Lovers</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
