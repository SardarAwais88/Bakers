import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { CATEGORIES_CONFIG } from '../data/bakeryData';
import { ProductCard } from './ProductCard';

interface MenuSectionProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: ProductCategory) => void;
  onAddToCart: (product: Product, selectedSize?: string, selectedFlavor?: string) => void;
  onQuickView: (product: Product) => void;
  wishlist?: Product[];
  wishlistIds?: string[];
  onToggleWishlist: (product: any) => void;
  cartItemCounts?: Record<string, number>;
  onUpdateCartQuantity?: (productId: string, quantity: number) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  products = [],
  selectedCategory = 'all',
  onSelectCategory,
  onAddToCart,
  onQuickView,
  wishlist = [],
  wishlistIds,
  onToggleWishlist,
  cartItemCounts = {},
  onUpdateCartQuantity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Compute active wishlist ID set safely
  const activeWishlistIds = useMemo(() => {
    if (Array.isArray(wishlistIds)) return wishlistIds;
    if (Array.isArray(wishlist)) return wishlist.map((p) => (typeof p === 'string' ? p : p.id));
    return [];
  }, [wishlistIds, wishlist]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat) return false;
        }
        // Dietary filter
        if (selectedDietary !== 'all') {
          if (!p.dietary || !p.dietary.includes(selectedDietary as any)) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default featured / bestsellers first
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, selectedDietary, sortBy]);

  const dietaryFilters = [
    { id: 'all', label: 'All Items' },
    { id: 'chef-special', label: '👨‍🍳 Chef Specials' },
    { id: 'eggless', label: '🌱 100% Eggless' },
    { id: 'contains-nuts', label: '🥜 Royal Nuts & Dry Fruits' },
  ];

  return (
    <section id="menu-section" className="py-12 bg-[#FAF7F2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching Mockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-amber-700 text-xs font-serif italic mb-1">
              <span>Our Bestsellers & Full Menu</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1938] tracking-tight">
              Most Loved Treats
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Freshly handcrafted every single morning with 100% pure butter and love.
            </p>
          </div>

          {/* Quick Search & Sort Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-[200px] sm:min-w-[240px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search cakes, mithai..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D91A2A]/20 focus:border-[#D91A2A] shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort bakery items"
                className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D91A2A]/20 shadow-2xs cursor-pointer"
              >
                <option value="featured">Featured / Popular</option>
                <option value="rating">Highest Rated ★</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {CATEGORIES_CONFIG.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as ProductCategory)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B1938] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200/80 hover:bg-gray-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dietary Sub-Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" />
            Filter:
          </span>
          {dietaryFilters.map((df) => (
            <button
              key={df.id}
              onClick={() => setSelectedDietary(df.id)}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                selectedDietary === df.id
                  ? 'bg-[#D91A2A] text-white shadow-2xs font-bold'
                  : 'bg-white/80 text-gray-600 border border-gray-200 hover:bg-white'
              }`}
            >
              {df.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                isWishlisted={activeWishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                cartQuantity={cartItemCounts[product.id] || 0}
                onUpdateCartQuantity={onUpdateCartQuantity}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 shadow-xs">
            <p className="text-4xl mb-2">🧁</p>
            <h3 className="text-lg font-bold text-[#0B1938]">No bakery items found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
              Try adjusting your search keywords or dietary filters to explore our full selection of freshly baked goods.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDietary('all');
                onSelectCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-[#0B1938] text-white rounded-xl text-xs font-bold hover:bg-[#D91A2A] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
