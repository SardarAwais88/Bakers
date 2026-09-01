import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, Clock, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen?: boolean;
  onClose: () => void;
  onAddToCart: (
    product: Product, 
    selectedSize?: string, 
    selectedFlavor?: string, 
    quantity?: number, 
    customNote?: string
  ) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: any) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors ? product.flavors[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const currentSize = product.sizes ? product.sizes[selectedSizeIndex] : null;
  const unitPrice = currentSize ? currentSize.price : product.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart(
      product,
      currentSize?.label,
      selectedFlavor || undefined,
      quantity,
      customNote || undefined
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md text-gray-700 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT: IMAGE & BADGES */}
        <div className="md:w-1/2 relative bg-gray-100 min-h-[260px] md:min-h-[460px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            {product.isBestseller && (
              <span className="bg-[#D91A2A] text-white text-xs font-bold uppercase px-2.5 py-1 rounded-md shadow">
                Bestseller
              </span>
            )}
            {product.discountPercentage && (
              <span className="bg-[#0B1938] text-amber-300 text-xs font-bold uppercase px-2.5 py-1 rounded-md shadow">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>

        {/* RIGHT: DETAILS & CUSTOMIZATIONS */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[500px] md:max-h-[550px]">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#D91A2A] uppercase tracking-wider">
                  {product.category.replace('-', ' ')}
                </span>
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="text-gray-400 hover:text-[#D91A2A] transition-colors p-1"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#D91A2A] text-[#D91A2A]' : ''}`} />
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1938] mt-1 leading-snug">
                {product.name}
              </h2>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mt-1.5 text-xs text-amber-500">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-700">{product.rating}</span>
                <span className="text-gray-400">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-2 pb-3 border-b border-gray-100">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#D91A2A]">
                Rs. {unitPrice.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-emerald-600 font-semibold ml-2">
                Freshly Baked on Order
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Size / Weight Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                  Select Size / Quantity
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.sizes.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between cursor-pointer ${
                        selectedSizeIndex === idx
                          ? 'border-[#0B1938] bg-slate-50 text-[#0B1938] shadow-xs'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span>{s.label}</span>
                      <span className="font-extrabold text-[#D91A2A]">Rs. {s.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Flavor Selector */}
            {product.flavors && product.flavors.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                  Available Flavors
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((f, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFlavor(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        selectedFlavor === f
                          ? 'bg-[#0B1938] text-white border-[#0B1938]'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom message / special instruction */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wide flex items-center justify-between">
                <span>Special Instructions or Cake Message</span>
                <span className="text-[10px] text-gray-400 font-normal">Optional</span>
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. 'Happy Birthday Sarah', eggless knife, extra napkins..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D91A2A]/30 focus:border-[#D91A2A]"
              />
            </div>

            {/* Ingredients & Allergens badge */}
            {product.ingredients && (
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100/80 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Key Ingredients:</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-snug">
                  {product.ingredients.join(' • ')}
                </p>
                {product.allergens && (
                  <p className="text-[10px] text-amber-900 font-semibold pt-0.5">
                    Allergens: {product.allergens.join(', ')}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Quantity & Add to Cart Footer */}
          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-3">
            {/* Quantity +/- */}
            <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white shadow-xs text-gray-700 hover:text-black font-bold flex items-center justify-center cursor-pointer"
              >
                -
              </button>
              <span className="w-10 text-center font-extrabold text-sm text-[#0B1938]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white shadow-xs text-gray-700 hover:text-black font-bold flex items-center justify-center cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add to Cart Submit */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#0B1938] hover:bg-[#D91A2A] text-white hover:shadow-lg'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add • Rs. {totalPrice.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
