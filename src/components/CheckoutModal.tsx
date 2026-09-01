import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  Store, 
  CreditCard, 
  MapPin, 
  Calendar, 
  Clock, 
  MessageCircle, 
  Download, 
  Sparkles,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import { CartItem, Order, DeliveryZone } from '../types';
import { DELIVERY_ZONES } from '../data/bakeryData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  appliedCoupon: string | null;
  onOrderSuccess: (order: Order) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  appliedCoupon,
  onOrderSuccess,
  onClearCart,
}) => {
  if (!isOpen) return null;

  // Checkout steps: 1 = Details & Payment, 2 = Order Confirmed
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedArea, setSelectedArea] = useState<DeliveryZone>(DELIVERY_ZONES[0]);
  const [pickupBranch, setPickupBranch] = useState('Main Gulberg III Flagship Showroom');
  
  // Customer details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('Today (Express)');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Within 45 - 60 Mins');
  const [specialNotes, setSpecialNotes] = useState('');
  
  // Payment methods
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'easypaisa' | 'jazzcash' | 'card' | 'bank_transfer'>('cod');
  
  // Confirmed Order State
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Financial calculations
  const deliveryCharge = orderType === 'pickup' ? 0 : subtotal > 3000 ? 0 : selectedArea.fee;
  const totalAmount = Math.max(0, subtotal - discount + deliveryCharge);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please provide your name and phone number to complete the order.');
      return;
    }
    if (orderType === 'delivery' && !streetAddress) {
      alert('Please provide your complete delivery street address.');
      return;
    }

    const orderId = `GB-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: orderId,
      customer: {
        name,
        phone,
        whatsapp: whatsapp || phone,
        email: email || 'customer@example.com',
        address: orderType === 'delivery' ? streetAddress : pickupBranch,
        cityArea: orderType === 'delivery' ? selectedArea.area : 'Store Pickup',
        orderType,
        pickupBranch: orderType === 'pickup' ? pickupBranch : undefined,
        deliveryDate,
        deliveryTimeSlot,
        specialNotes,
      },
      items,
      subtotal,
      discount,
      deliveryCharge,
      total: totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'placed',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      trackingStep: 1,
      estimatedArrival: 'Today in 45-60 minutes',
    };

    setConfirmedOrder(newOrder);
    onOrderSuccess(newOrder);
    onClearCart();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleWhatsAppReceipt = () => {
    if (!confirmedOrder) return;
    const itemsSummary = confirmedOrder.items
      .map((i) => `• ${i.quantity}x ${i.name} (${i.selectedSize || 'Std'}) - Rs. ${i.price * i.quantity}`)
      .join('\n');

    const msg = `🍰 *Grow Bakers & Sweets — Order Receipt*
*Order ID:* ${confirmedOrder.id}
*Customer:* ${confirmedOrder.customer.name} (${confirmedOrder.customer.phone})
*Type:* ${confirmedOrder.customer.orderType.toUpperCase()}
*Address:* ${confirmedOrder.customer.address}, ${confirmedOrder.customer.cityArea}
*Items:*
${itemsSummary}
*Subtotal:* Rs. ${confirmedOrder.subtotal}
*Discount:* Rs. ${confirmedOrder.discount}
*Delivery Fee:* Rs. ${confirmedOrder.deliveryCharge}
*Total Payable:* Rs. ${confirmedOrder.total}
*Payment:* ${confirmedOrder.paymentMethod.toUpperCase()} (${confirmedOrder.paymentStatus.toUpperCase()})

Thank you for choosing Grow Bakers & Sweets!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/923001234567?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 bg-[#FAF7F2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#0B1938] text-white flex items-center justify-center font-bold">
              🛍️
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#0B1938]">
                {confirmedOrder ? 'Order Confirmed!' : 'Online Checkout'}
              </h3>
              <p className="text-xs text-gray-500">
                {confirmedOrder ? `Order #${confirmedOrder.id}` : 'Grow Bakers & Sweets Express Dispatch'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-black flex items-center justify-center shadow-xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {confirmedOrder ? (
            /* ORDER SUCCESS SCREEN */
            <div className="space-y-6 text-center py-2 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                ✓
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#0B1938]">Thank You for Your Order!</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Your order has been sent to our ovens in Gulberg. You will receive an SMS and WhatsApp confirmation.
                </p>
              </div>

              {/* Order summary card */}
              <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-amber-100 text-left space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-amber-200/60 font-bold">
                  <span className="text-gray-600">Order Reference:</span>
                  <span className="text-base text-[#D91A2A] font-black">{confirmedOrder.id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Recipient Name:</span>
                  <span className="font-bold text-gray-800">{confirmedOrder.customer.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Address:</span>
                  <span className="font-bold text-gray-800 text-right max-w-xs">{confirmedOrder.customer.address}, {confirmedOrder.customer.cityArea}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Mode:</span>
                  <span className="font-bold uppercase text-emerald-700">{confirmedOrder.paymentMethod}</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-amber-200/60 font-extrabold text-sm text-[#0B1938]">
                  <span>Total Paid/Payable:</span>
                  <span className="text-base text-[#D91A2A]">Rs. {confirmedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleWhatsAppReceipt}
                  className="flex-1 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Receive WhatsApp Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-[#0B1938] hover:bg-[#D91A2A] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </button>
              </div>

            </div>
          ) : (
            /* CHECKOUT FORM */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* 1. Pickup vs Delivery Switch */}
              <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    orderType === 'delivery'
                      ? 'bg-white text-[#0B1938] shadow-xs'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  <Truck className="w-4 h-4 text-[#D91A2A]" />
                  <span>Doorstep Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    orderType === 'pickup'
                      ? 'bg-white text-[#0B1938] shadow-xs'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  <Store className="w-4 h-4 text-[#0B1938]" />
                  <span>Store Pickup (Free)</span>
                </button>
              </div>

              {/* 2. Customer Contact Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-[#0B1938] uppercase tracking-wider">
                  1. Contact Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Fatima Tariq"
                      className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0300 1234567"
                      className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Delivery / Pickup Location */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-[#0B1938] uppercase tracking-wider">
                  2. {orderType === 'delivery' ? 'Delivery Address & Zone' : 'Select Pickup Branch'}
                </h4>

                {orderType === 'delivery' ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-1">Delivery Area / Zone *</label>
                      <select
                        value={selectedArea.area}
                        onChange={(e) => {
                          const found = DELIVERY_ZONES.find((z) => z.area === e.target.value);
                          if (found) setSelectedArea(found);
                        }}
                        className="w-full text-xs font-semibold p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                      >
                        {DELIVERY_ZONES.map((zone, idx) => (
                          <option key={idx} value={zone.area}>
                            {zone.area} (Delivery: Rs. {zone.fee} • Est: {zone.estTime})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-1">House, Street & Landmark *</label>
                      <input
                        type="text"
                        required
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="e.g. House #14, Street 3, Block G, near Jalal Sons"
                        className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                    <p className="font-bold">Main Flagship Showroom Pickup:</p>
                    <p className="text-[11px] mt-0.5">123 Baker Street, Main Boulevard, Gulberg III, Lahore.</p>
                    <p className="text-[10px] text-emerald-700 font-bold mt-1">Ready in 20 minutes with freshly sealed bakery box.</p>
                  </div>
                )}
              </div>

              {/* 4. Payment Method */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-[#0B1938] uppercase tracking-wider">
                  3. Payment Method
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                    { id: 'easypaisa', label: 'Easypaisa Mobile', icon: '📱' },
                    { id: 'jazzcash', label: 'JazzCash Wallet', icon: '⚡' },
                    { id: 'card', label: 'Debit/Credit Card', icon: '💳' },
                    { id: 'bank_transfer', label: 'Bank Transfer (Meezan)', icon: '🏦' },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer flex items-center gap-2 ${
                        paymentMethod === pm.id
                          ? 'border-[#D91A2A] bg-red-50/70 text-[#0B1938] ring-1 ring-[#D91A2A]'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                      }`}
                    >
                      <span className="text-base">{pm.icon}</span>
                      <span className="text-[11px]">{pm.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Special Notes */}
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">
                  Delivery Notes / Candle requests (Optional)
                </label>
                <input
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Please include 5 candles and don't ring the doorbell after 9pm."
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                />
              </div>

              {/* Summary Breakdown */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Items Subtotal:</span>
                  <span className="font-bold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({appliedCoupon}):</span>
                    <span>-Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee:</span>
                  <span className="font-bold text-gray-900">
                    {deliveryCharge === 0 ? <span className="text-emerald-600">FREE</span> : `Rs. ${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[#0B1938] pt-2 border-t border-gray-200">
                  <span>Total Amount:</span>
                  <span className="text-lg text-[#D91A2A]">Rs. {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#D91A2A] hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Confirm & Place Order (Rs. {totalAmount.toLocaleString()})</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
