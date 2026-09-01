import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  discountAmount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  discountAmount,
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryEstimated = subtotal > 3000 ? 0 : subtotal > 0 ? 150 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryEstimated);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (!couponInput.trim()) return;

    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (success) {
      setCouponSuccess(`Coupon "${couponInput.trim().toUpperCase()}" applied!`);
      setCouponInput('');
    } else {
      setCouponError('Invalid promo code. Try SWEET15 or WEEKEND20.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#0B1938] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#0B1938]">Your Shopping Bag</h3>
              <p className="text-[11px] text-gray-500">{items.length} unique {items.length === 1 ? 'item' : 'items'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-black flex items-center justify-center shadow-xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center text-2xl">
                🧁
              </div>
              <h4 className="font-bold text-[#0B1938] text-base">Your bag is empty</h4>
              <p className="text-xs text-gray-500 max-w-xs">
                Explore our fresh signature cakes, pastries, desi ghee mithai, and brownies to add delicious treats!
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#0B1938] hover:bg-[#D91A2A] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartId}
                className="flex items-start gap-3 p-3 bg-[#FAF7F2]/60 rounded-2xl border border-gray-100 relative group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-bold text-xs sm:text-sm text-[#0B1938] truncate">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.cartId)}
                      className="text-gray-400 hover:text-[#D91A2A] transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {item.selectedSize && (
                    <p className="text-[11px] text-gray-500 font-medium">
                      Size: <span className="text-gray-700 font-semibold">{item.selectedSize}</span>
                    </p>
                  )}
                  {item.selectedFlavor && (
                    <p className="text-[11px] text-gray-500 font-medium">
                      Flavor: <span className="text-gray-700 font-semibold">{item.selectedFlavor}</span>
                    </p>
                  )}
                  {item.customNote && (
                    <p className="text-[10px] text-amber-800 italic truncate bg-amber-50 px-1.5 py-0.5 rounded">
                      Note: "{item.customNote}"
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-black text-xs sm:text-sm text-[#D91A2A]">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-white rounded-lg border border-gray-200 p-0.5 shadow-2xs">
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black font-bold text-xs cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#0B1938]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black font-bold text-xs cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Checkout Controls */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-white space-y-3.5 shadow-lg">
            
            {/* Promo Code input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Coupon "{appliedCoupon}" Applied (-Rs. {discountAmount})</span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-red-500 hover:text-red-700 font-bold text-xs cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. SWEET15)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#0B1938] hover:bg-[#D91A2A] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[10px] text-red-500 mt-1">{couponError}</p>}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-gray-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Promo Discount:</span>
                  <span>-Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                <span className="font-bold text-gray-900">
                  {deliveryEstimated === 0 ? (
                    <span className="text-emerald-600 font-extrabold">FREE (Above Rs. 3,000)</span>
                  ) : (
                    `Rs. ${deliveryEstimated}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#0B1938] pt-2 border-t border-gray-100">
                <span>Total Amount:</span>
                <span className="text-base text-[#D91A2A]">Rs. {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout CTA Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#D91A2A] hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
