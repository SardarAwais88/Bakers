import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onClearWishlist: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onClearWishlist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#D91A2A] text-white flex items-center justify-center">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#0B1938]">My Saved Favorites</h3>
              <p className="text-[11px] text-gray-500">{wishlist.length} saved bakery delicacies</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-black flex items-center justify-center shadow-xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-2xl">
                ❤️
              </div>
              <h4 className="font-bold text-[#0B1938] text-base">No favorites saved yet</h4>
              <p className="text-xs text-gray-500 max-w-xs">
                Click the heart icon on any cake, sweet, or pastry to save them to your wishlist for later.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#0B1938] hover:bg-[#D91A2A] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer transition-colors"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            wishlist.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center gap-3 p-3 bg-[#FAF7F2]/60 rounded-2xl border border-gray-100 hover:shadow-xs transition-shadow"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0B1938] truncate">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 truncate">{prod.description}</p>
                  <p className="font-black text-xs sm:text-sm text-[#D91A2A] mt-1">
                    Rs. {prod.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onAddToCart(prod);
                      onRemoveFromWishlist(prod.id);
                    }}
                    className="p-2 rounded-xl bg-[#0B1938] hover:bg-[#D91A2A] text-white transition-colors cursor-pointer"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(prod.id)}
                    className="p-2 rounded-xl bg-white hover:bg-red-50 text-gray-400 hover:text-red-600 border border-gray-200 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between">
            <button
              onClick={onClearWishlist}
              className="text-xs font-bold text-gray-500 hover:text-red-600 transition-colors"
            >
              Clear All Favorites
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#0B1938] text-white text-xs font-bold rounded-xl"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
