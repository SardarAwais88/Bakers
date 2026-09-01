import React from 'react';
import { Sparkles, Award, ChefHat, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onLearnMore?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore }) => {
  return (
    <section id="about-section" className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT 5 COLS: OUR STORY TEXT */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-1.5 text-amber-700 text-xs font-serif italic">
              <span>Our Story</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1938] tracking-tight leading-tight">
              Crafting Happiness <br className="hidden sm:inline" />
              Since Day One
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              At <b>Grow Bakers & Sweets</b>, every single product is made with the finest natural ingredients and baked with immense passion. We believe in uncompromised quality, daily oven-freshness, and spreading sweetness into every special moment of your life.
            </p>

            <p className="text-xs text-gray-500 leading-relaxed">
              From our generational secret desi ghee mithai recipes to European-style multi-layered pastries and artisan sourdoughs, our master bakers blend time-honored heritage with contemporary pastry artistry.
            </p>

            <div className="pt-2">
              <a
                href="#contact-section"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0B1938] hover:bg-[#D91A2A] text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shadow-xs cursor-pointer"
              >
                <span>Read More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* MIDDLE 4 COLS: 4 PILLARS (2x2 Grid matching mockup) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3.5">
            
            {/* 1. Premium Ingredients */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-amber-100/80 text-center flex flex-col items-center justify-center space-y-2 hover:shadow-xs transition-shadow">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-extrabold text-[#0B1938]">Premium Ingredients</h4>
              <p className="text-[11px] text-gray-500 leading-tight">
                We use only the finest imported chocolate and farm-fresh dairy.
              </p>
            </div>

            {/* 2. Freshly Baked */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-amber-100/80 text-center flex flex-col items-center justify-center space-y-2 hover:shadow-xs transition-shadow">
              <div className="w-10 h-10 rounded-full bg-red-100 text-[#D91A2A] flex items-center justify-center">
                <ChefHat className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-extrabold text-[#0B1938]">Freshly Baked</h4>
              <p className="text-[11px] text-gray-500 leading-tight">
                Baked fresh every morning at 6 AM to ensure the best taste.
              </p>
            </div>

            {/* 3. Hygienic & Safe */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-amber-100/80 text-center flex flex-col items-center justify-center space-y-2 hover:shadow-xs transition-shadow">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-extrabold text-[#0B1938]">Hygienic & Safe</h4>
              <p className="text-[11px] text-gray-500 leading-tight">
                100% hygienic environment & strict ISO quality controls.
              </p>
            </div>

            {/* 4. Made with Love */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-amber-100/80 text-center flex flex-col items-center justify-center space-y-2 hover:shadow-xs transition-shadow">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-extrabold text-[#0B1938]">Made with Love</h4>
              <p className="text-[11px] text-gray-500 leading-tight">
                Every single bite is crafted with utmost care and affection.
              </p>
            </div>

          </div>

          {/* RIGHT 3 COLS: BAKERY SHOWROOM IMAGE MATCHING MOCKUP */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 group">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                alt="Grow Bakers & Sweets Store Interior"
                className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Store banner overlay tag matching mockup */}
              <div className="absolute top-4 left-4 right-4 bg-[#0B1938]/90 backdrop-blur-md rounded-xl p-2.5 text-center text-white border border-white/20">
                <p className="font-extrabold text-xs">Grow bakers & sweet</p>
                <p className="text-[9px] uppercase tracking-widest text-amber-300 mt-0.5">— Bring the Best —</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
