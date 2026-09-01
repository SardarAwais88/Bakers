import React from 'react';
import { CATEGORIES_CONFIG } from '../data/bakeryData';
import { ProductCategory } from '../types';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  // Visual image miniatures for each category matching the mockup style
  const categoryImages: Record<string, string> = {
    all: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=160&q=80',
    cakes: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=160&q=80',
    pastries: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=160&q=80',
    brownies: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=160&q=80',
    sweets: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=160&q=80',
    cookies: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=160&q=80',
    bakery: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=160&q=80',
    breads: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=160&q=80',
    'gift-boxes': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=160&q=80',
    beverages: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=160&q=80',
  };

  return (
    <div className="w-full bg-white py-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
          {CATEGORIES_CONFIG.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as ProductCategory)}
                className={`flex flex-col items-center group shrink-0 transition-all cursor-pointer ${
                  isSelected ? 'scale-105' : 'hover:-translate-y-1'
                }`}
              >
                {/* Circular image avatar */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 transition-all shadow-sm flex items-center justify-center relative overflow-hidden ${
                    isSelected
                      ? 'ring-3 ring-[#D91A2A] ring-offset-2 shadow-md'
                      : 'ring-1 ring-gray-200 group-hover:ring-gray-300'
                  }`}
                >
                  <img
                    src={categoryImages[cat.id]}
                    alt={cat.label}
                    className="w-full h-full object-cover rounded-full"
                  />
                  {/* Subtle overlay on active */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#D91A2A]/10 rounded-full" />
                  )}
                </div>

                {/* Category label */}
                <span
                  className={`mt-2 text-xs font-semibold text-center whitespace-nowrap transition-colors ${
                    isSelected ? 'text-[#D91A2A] font-bold' : 'text-[#0B1938] group-hover:text-[#D91A2A]'
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
