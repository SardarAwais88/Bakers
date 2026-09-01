import React, { useState } from 'react';
import { 
  X, 
  User, 
  Package, 
  MapPin, 
  Gift, 
  Heart, 
  LogOut, 
  Phone, 
  Mail, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Order } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onTrackOrder: (orderId: string) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  orders,
  onTrackOrder,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'rewards'>('orders');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
        
        {/* Top Header */}
        <div className="p-5 border-b border-gray-100 bg-[#0B1938] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-[#0B1938] font-black flex items-center justify-center text-sm shadow">
              MS
            </div>
            <div>
              <h3 className="font-extrabold text-base">Mariam Siddiqui</h3>
              <p className="text-xs text-amber-300 font-medium">Sweet VIP Member • 450 Points</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-3 border-b border-gray-100 bg-[#FAF7F2] text-xs font-bold text-gray-600">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'text-[#D91A2A] border-b-2 border-[#D91A2A] bg-white font-extrabold'
                : 'hover:text-gray-900'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`py-3 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'rewards'
                ? 'text-[#D91A2A] border-b-2 border-[#D91A2A] bg-white font-extrabold'
                : 'hover:text-gray-900'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Sweet Rewards</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'text-[#D91A2A] border-b-2 border-[#D91A2A] bg-white font-extrabold'
                : 'hover:text-gray-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile Details</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* 1. ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-xs">
                  No orders placed yet.
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl border border-gray-200 bg-[#FAF7F2]/40 hover:bg-white hover:shadow-xs transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-[#0B1938] bg-white px-2 py-0.5 rounded border border-gray-200">
                        {order.id}
                      </span>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        order.orderStatus === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.orderStatus.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600">
                      {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                      <div>
                        <span className="text-gray-400">Total: </span>
                        <span className="font-bold text-[#0B1938]">Rs. {order.total.toLocaleString()}</span>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onTrackOrder(order.id);
                        }}
                        className="font-bold text-[#D91A2A] hover:underline"
                      >
                        Track Order →
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 2. REWARDS TAB */}
          {activeTab === 'rewards' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0B1938] to-[#1a3675] text-white space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Grow Sweet Club</span>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <h4 className="text-3xl font-black">450 Points</h4>
                <p className="text-xs text-gray-300">
                  Earn 10 points on every Rs. 100 spent. Redeem points for free cupcakes and discounts!
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-bold text-gray-700 uppercase">Available Vouchers</h5>
                
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-amber-900">Rs. 250 Off Voucher</p>
                    <p className="text-[11px] text-amber-700">Requires 300 Points</p>
                  </div>
                  <button className="px-3 py-1 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700">
                    Redeem
                  </button>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-emerald-900">Free Belgian Eclair Pastry</p>
                    <p className="text-[11px] text-emerald-700">Requires 500 Points</p>
                  </div>
                  <button className="px-3 py-1 bg-gray-200 text-gray-500 font-bold rounded-lg cursor-not-allowed">
                    50 Pts Away
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="font-bold text-gray-700 block">Full Name</label>
                <input
                  type="text"
                  defaultValue="Mariam Siddiqui"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-gray-700 block">Phone Number</label>
                <input
                  type="text"
                  defaultValue="+92 300 1234567"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-gray-700 block">Saved Primary Address</label>
                <input
                  type="text"
                  defaultValue="House 24, Street 7, DHA Phase 5, Lahore"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <button className="w-full py-2.5 bg-[#0B1938] text-white font-bold rounded-xl hover:bg-[#D91A2A] transition-colors">
                Save Profile Changes
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
