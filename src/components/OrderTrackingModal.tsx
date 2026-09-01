import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  PackageCheck, 
  Phone, 
  MapPin,
  AlertCircle
} from 'lucide-react';
import { Order } from '../types';
import { INITIAL_ORDERS } from '../data/bakeryData';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Record<string, Order>;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  if (!isOpen) return null;

  const [searchId, setSearchId] = useState('GB-84920');
  const [activeOrder, setActiveOrder] = useState<Order | null>(
    orders['GB-84920'] || Object.values(orders)[0] || null
  );
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanId = searchId.trim().toUpperCase();
    if (orders[cleanId]) {
      setActiveOrder(orders[cleanId]);
    } else {
      setErrorMsg(`No order found with ID "${cleanId}". Please check your receipt.`);
    }
  };

  const steps = [
    { step: 1, label: 'Order Confirmed', icon: <CheckCircle2 className="w-4 h-4" />, desc: 'Order received & payment verified' },
    { step: 2, label: 'Baking in Oven', icon: <ChefHat className="w-4 h-4" />, desc: 'Master bakers preparing fresh recipe' },
    { step: 3, label: 'Quality Check & Boxed', icon: <PackageCheck className="w-4 h-4" />, desc: 'Insulated packaging with cooling wrap' },
    { step: 4, label: 'Out for Delivery', icon: <Truck className="w-4 h-4" />, desc: 'Rider dispatched to your address' },
    { step: 5, label: 'Delivered', icon: <CheckCircle2 className="w-4 h-4" />, desc: 'Delivered fresh at your doorstep' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 bg-[#0B1938] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-extrabold text-base">Live Order Tracking</h3>
              <p className="text-xs text-gray-300">Grow Bakers & Sweets Fleet Tracker</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Search Order ID Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. GB-84920)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20 uppercase font-mono font-bold"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#D91A2A] hover:bg-rose-700 text-white text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
            >
              Track
            </button>
          </form>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {activeOrder && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Order Status Banner */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-amber-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-gray-400">Current Status</span>
                  <h4 className="text-base font-black text-[#0B1938] capitalize mt-0.5">
                    {activeOrder.orderStatus.replace('_', ' ')}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Est. Arrival: <span className="font-bold text-[#D91A2A]">{activeOrder.estimatedArrival || 'Within 45 mins'}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded-lg border border-gray-200 text-[#0B1938]">
                    {activeOrder.id}
                  </span>
                  <span className="block text-[10px] text-gray-400 mt-1">
                    {activeOrder.createdAt}
                  </span>
                </div>
              </div>

              {/* 5-Stage Visual Progress Stepper */}
              <div className="space-y-4 py-2">
                {steps.map((s, idx) => {
                  const isCompleted = activeOrder.trackingStep >= s.step;
                  const isCurrent = activeOrder.trackingStep === s.step;

                  return (
                    <div key={s.step} className="flex items-start gap-3 relative">
                      {/* Vertical connector line */}
                      {idx < steps.length - 1 && (
                        <div
                          className={`absolute left-4 top-8 w-0.5 h-8 -ml-px ${
                            activeOrder.trackingStep > s.step ? 'bg-[#D91A2A]' : 'bg-gray-200'
                          }`}
                        />
                      )}

                      {/* Step Circle */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                          isCompleted
                            ? 'bg-[#D91A2A] text-white shadow-md'
                            : 'bg-gray-100 text-gray-400'
                        } ${isCurrent ? 'ring-4 ring-red-100 scale-110' : ''}`}
                      >
                        {s.icon}
                      </div>

                      {/* Step Details */}
                      <div className="flex-1 pb-4">
                        <h5 className={`text-xs font-extrabold ${isCompleted ? 'text-[#0B1938]' : 'text-gray-400'}`}>
                          {s.label}
                        </h5>
                        <p className="text-[11px] text-gray-500 mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Rider & Delivery Location Info */}
              <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-2 text-xs">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-[#D91A2A] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">Destination:</p>
                      <p className="text-gray-500">{activeOrder.customer.address}, {activeOrder.customer.cityArea}</p>
                    </div>
                  </div>

                  <a
                    href="tel:+923001234567"
                    className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg hover:bg-emerald-100"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Support</span>
                  </a>
                </div>

                {/* Items in Order */}
                <div className="pt-2 border-t border-gray-100">
                  <p className="font-bold text-gray-700 mb-1">Ordered Items ({activeOrder.items.length}):</p>
                  <ul className="text-gray-500 space-y-1">
                    {activeOrder.items.map((it, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{it.quantity}x {it.name} ({it.selectedSize || 'Standard'})</span>
                        <span className="font-semibold text-gray-800">Rs. {(it.price * it.quantity).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
