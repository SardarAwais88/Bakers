import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Plus, Minus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedSize?: string, selectedFlavor?: string) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  cartQuantity?: number;
  onUpdateCartQuantity?: (productId: string, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
  cartQuantity = 0,
  onUpdateCartQuantity,
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const currentSize = product.sizes ? product.sizes[selectedSizeIndex] : null;
  const currentPrice = currentSize ? currentSize.price : product.price;

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(
      product, 
      currentSize?.label, 
      product.flavors ? product.flavors[0] : undefined
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100/80 hover:border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* 1. PRODUCT PHOTO & BADGES */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-50 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
          loading="lazy"
        />

        {/* Badges Container */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isBestseller && (
            <span className="bg-[#D91A2A] text-white text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded shadow-xs">
              Bestseller
            </span>
          )}
          {product.discountPercentage && (
            <span className="bg-[#0B1938] text-amber-300 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-xs">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-xs">
              New
            </span>
          )}
        </div>

        {/* Action icons over image */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          {/* Wishlist Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
              isWishlisted
                ? 'bg-rose-50 text-[#D91A2A]'
                : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:text-[#D91A2A] hover:bg-white'
            }`}
            aria-label="Save to wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#D91A2A]' : ''}`} />
          </button>

          {/* Quick View */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:text-[#0B1938] hover:bg-white flex items-center justify-center transition-all shadow-md cursor-pointer opacity-90 group-hover:opacity-100"
            title="Quick View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Dietary Tag Pill */}
        {product.dietary && product.dietary.length > 0 && (
          <div className="absolute bottom-2 left-2.5">
            <span className="bg-white/90 backdrop-blur-md text-[10px] font-semibold text-gray-700 px-2 py-0.5 rounded-md border border-white/60">
              {product.dietary[0] === 'eggless' && '🌱 100% Eggless'}
              {product.dietary[0] === 'chef-special' && '👨‍🍳 Master Chef'}
              {product.dietary[0] === 'contains-nuts' && '🥜 Premium Nuts'}
              {product.dietary[0] === 'sugar-free' && '🍃 Sugar Free'}
            </span>
          </div>
        )}
      </div>

      {/* 2. PRODUCT DETAILS */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating & Review count */}
          <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-gray-600">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-bold text-sm sm:text-base text-[#0B1938] hover:text-[#D91A2A] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>

          {/* Sizes / Weights selector if applicable */}
          {product.sizes && product.sizes.length > 1 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {product.sizes.map((s, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSizeIndex(idx);
                  }}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                    selectedSizeIndex === idx
                      ? 'bg-[#0B1938] text-white border-[#0B1938]'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {s.label.split('(')[0].trim()}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. PRICE & ADD TO CART ACTION */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-[#D91A2A]">
                Rs. {currentPrice.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-gray-400 block -mt-0.5">Freshly baked</span>
          </div>

          {/* Add to Cart Button */}
          {cartQuantity > 0 && onUpdateCartQuantity ? (
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 border border-gray-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateCartQuantity(product.id, cartQuantity - 1);
                }}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white hover:bg-red-50 text-gray-700 hover:text-[#D91A2A] shadow-2xs transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-xs font-bold text-[#0B1938] min-w-[20px] text-center">
                {cartQuantity}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateCartQuantity(product.id, cartQuantity + 1);
                }}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 shadow-2xs transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddClick}
              disabled={!product.inStock}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : product.inStock
                  ? 'bg-[#0B1938] hover:bg-[#D91A2A] text-white hover:shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : product.inStock ? (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              ) : (
                <span>Sold Out</span>
              )}
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
