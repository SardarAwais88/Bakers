import React, { useState } from 'react';
import { X, Search, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products = [],
  onSelectProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const cleanQ = query.trim().toLowerCase();
  const filtered = cleanQ === ''
    ? []
    : (products || []).filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(cleanQ)) ||
          (p.category && p.category.toLowerCase().includes(cleanQ)) ||
          (p.description && p.description.toLowerCase().includes(cleanQ)) ||
          (p.flavors && p.flavors.some((f) => f && f.toLowerCase().includes(cleanQ)))
      );

  const quickTags = ['Chocolate Fudge Cake', 'Gulab Jamun', 'Nutella Brownie', 'Eclairs', 'Patties', 'Barfi'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95">
        
        {/* Search input bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center gap-3 bg-[#FAF7F2]">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cakes, pastries, mithai, brownies, patties..."
            className="flex-1 text-sm bg-transparent border-none focus:outline-none text-[#0B1938] font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-gray-400 hover:text-black font-bold mr-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-black flex items-center justify-center shadow-xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick tags */}
        <div className="px-5 py-3 bg-white border-b border-gray-100 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
          <span className="text-gray-400 font-bold uppercase text-[10px] shrink-0">Popular:</span>
          {quickTags.map((tag, i) => (
            <button
              key={i}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-red-50 hover:text-[#D91A2A] text-gray-600 font-medium shrink-0 transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="p-5 max-h-96 overflow-y-auto space-y-3">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-gray-400">
              Type anything to discover freshly baked goods and sweets.
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-500">
              No products found matching "<span className="font-bold">{query}</span>". Try another keyword or browse our menu categories.
            </div>
          ) : (
            filtered.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:bg-[#FAF7F2] transition-colors group cursor-pointer"
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#D91A2A] uppercase">{prod.category}</span>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0B1938] group-hover:text-[#D91A2A] transition-colors">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-1">{prod.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-black text-xs sm:text-sm text-[#0B1938]">
                    Rs. {prod.price.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(prod);
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-[#0B1938] hover:bg-[#D91A2A] text-white transition-colors cursor-pointer"
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
