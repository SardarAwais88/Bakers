import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Package, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  Truck, 
  ChefHat, 
  Eye, 
  ToggleLeft, 
  ToggleRight 
} from 'lucide-react';
import { Order, Product } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Record<string, Order>;
  onUpdateOrderStatus: (orderId: string, status: Order['orderStatus'], trackingStep: number) => void;
  products: Product[];
  onToggleStock: (productId: string) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateOrderStatus,
  products,
  onToggleStock,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');

  const orderList: Order[] = Object.values(orders);
  const totalRevenue = orderList.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orderList.filter((o) => o.orderStatus !== 'delivered').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 bg-[#0B1938] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black shadow">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base">Bakery Operations Console</h3>
                <span className="text-[10px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-gray-300">Grow Bakers & Sweets Store Management</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 bg-[#FAF7F2] border-b border-gray-200 p-4 gap-4 text-center">
          <div>
            <span className="text-[11px] text-gray-500 font-bold uppercase">Today's Orders</span>
            <p className="text-xl font-black text-[#0B1938] mt-0.5">{orderList.length}</p>
          </div>
          <div>
            <span className="text-[11px] text-gray-500 font-bold uppercase">Pending Kitchen Queue</span>
            <p className="text-xl font-black text-[#D91A2A] mt-0.5">{pendingOrders}</p>
          </div>
          <div>
            <span className="text-[11px] text-gray-500 font-bold uppercase">Total Order Value</span>
            <p className="text-xl font-black text-emerald-700 mt-0.5">Rs. {totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-white px-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#D91A2A] text-[#D91A2A]'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Manage Customer Orders ({orderList.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-[#D91A2A] text-[#D91A2A]'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Product Availability & Stock ({products.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* 1. ORDERS DISPATCH MANAGER */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orderList.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-sm text-[#0B1938]">{ord.id}</span>
                        <span className="text-xs text-gray-400">• {ord.createdAt}</span>
                        <span className="text-xs bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded uppercase">
                          {ord.paymentMethod} ({ord.paymentStatus})
                        </span>
                      </div>
                      <p className="text-xs font-bold text-gray-700 mt-1">
                        {ord.customer.name} ({ord.customer.phone}) — {ord.customer.address}, {ord.customer.cityArea}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-[#D91A2A]">
                        Rs. {ord.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Order Items list */}
                  <div className="text-xs text-gray-600 bg-[#FAF7F2] p-3 rounded-xl">
                    <p className="font-bold text-gray-800 mb-1">Items to Bake & Pack:</p>
                    <ul className="space-y-0.5">
                      {ord.items.map((it, i) => (
                        <li key={i} className="flex justify-between">
                          <span>• {it.quantity}x {it.name} ({it.selectedSize || 'Standard'} {it.selectedFlavor ? `- ${it.selectedFlavor}` : ''})</span>
                          <span className="font-semibold">Rs. {it.price * it.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    {ord.customer.specialNotes && (
                      <p className="mt-2 text-amber-900 font-semibold italic bg-amber-50 p-1.5 rounded">
                        Special Instructions: "{ord.customer.specialNotes}"
                      </p>
                    )}
                  </div>

                  {/* Quick Order Stage Controls */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-bold text-gray-500 mr-2">Update Stage:</span>
                    
                    <button
                      onClick={() => onUpdateOrderStatus(ord.id, 'baking', 2)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        ord.orderStatus === 'baking'
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-amber-100'
                      }`}
                    >
                      👨‍🍳 Baking in Oven
                    </button>

                    <button
                      onClick={() => onUpdateOrderStatus(ord.id, 'out_for_delivery', 4)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        ord.orderStatus === 'out_for_delivery'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                      }`}
                    >
                      🚚 Out with Rider
                    </button>

                    <button
                      onClick={() => onUpdateOrderStatus(ord.id, 'delivered', 5)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        ord.orderStatus === 'delivered'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-emerald-100'
                      }`}
                    >
                      ✓ Delivered
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. INVENTORY & STOCK TOGGLE */}
          {activeTab === 'inventory' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white"
                >
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h5 className="font-bold text-xs text-[#0B1938] line-clamp-1">{p.name}</h5>
                      <p className="text-[11px] text-[#D91A2A] font-extrabold">Rs. {p.price}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleStock(p.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                      p.inStock
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {p.inStock ? 'In Stock' : 'Sold Out'}
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
