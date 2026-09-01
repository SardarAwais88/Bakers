import React, { useState } from 'react';
import { Sparkles, Eye, X, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/bakeryData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'cakes', label: '🎂 Cakes' },
    { id: 'pastries', label: '🧁 Pastries' },
    { id: 'sweets', label: '🍬 Mithai' },
    { id: 'brownies', label: '🍫 Brownies' },
    { id: 'interior', label: '🏬 Bakery Interior' },
    { id: 'packaging', label: '🎁 Luxury Packaging' },
    { id: 'events', label: '🎉 Special Events' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery-section" className="py-14 bg-[#FAF7F2]/50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-1.5 text-amber-700 text-xs font-serif italic mb-1">
            <span>Visual Showcase</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1938] tracking-tight">
            Our Bakery & Event Gallery
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            A glimpse into our live kitchen, signature custom wedding cakes, traditional mithai trays, and elegant shop interiors.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0B1938] text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl bg-gray-100 cursor-pointer transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay with info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  {item.category}
                </span>
                <h4 className="font-bold text-sm leading-tight mt-0.5">{item.title}</h4>
                <p className="text-xs text-gray-300 line-clamp-2 mt-1">{item.description}</p>
                <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-rose-300">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="w-full max-h-[60vh] object-cover"
            />

            <div className="p-6">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D91A2A] bg-red-50 px-2 py-0.5 rounded">
                {activeItem.category}
              </span>
              <h3 className="text-xl font-extrabold text-[#0B1938] mt-2">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
