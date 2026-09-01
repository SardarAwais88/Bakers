import React from 'react';
import { Truck, Clock, MapPin, ShieldCheck, CheckCircle2, Store, Sparkles } from 'lucide-react';
import { DELIVERY_ZONES } from '../data/bakeryData';

export const DeliverySection: React.FC = () => {
  return (
    <section id="delivery-section" className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D91A2A] text-xs font-bold uppercase tracking-wider mb-2">
            <Truck className="w-3.5 h-3.5" />
            <span>Fast & Insulated Shipping</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1938] tracking-tight">
            Delivery & Pickup Guidelines
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            We deliver chilled and safely boxed cakes, sweets and fresh bakes across Lahore with real-time tracking and same-day dispatch.
          </p>
        </div>

        {/* 3 Core Delivery Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-amber-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-[#D91A2A] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#0B1938]">Same-Day 2-Hr Express</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Order before 8:00 PM for same-day delivery. Standard items arrive in 45-75 minutes.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-amber-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#0B1938]">Free Delivery on Rs. 3,000+</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Enjoy 100% free delivery anywhere in Lahore on orders exceeding Rs. 3,000.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-amber-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#0B1938]">Free Store Pickup</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Collect your order fresh from our Main Gulberg branch within 20 minutes with zero extra charges.
              </p>
            </div>
          </div>
        </div>

        {/* Coverage Zones Table */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="p-5 bg-[#0B1938] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-extrabold text-base">Lahore Coverage Areas & Delivery Charges</h3>
              <p className="text-xs text-gray-300">Deliveries operate daily from 9:00 AM to 11:00 PM</p>
            </div>
            <span className="text-xs bg-amber-400 text-[#0B1938] font-bold px-3 py-1 rounded-full self-start sm:self-auto">
              Active Fleet on Roads
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Delivery Area / Zone</th>
                  <th className="py-3.5 px-4">Estimated Delivery Time</th>
                  <th className="py-3.5 px-4">Delivery Fee</th>
                  <th className="py-3.5 px-4">Minimum Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {DELIVERY_ZONES.map((zone, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#0B1938] flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#D91A2A]" />
                      <span>{zone.area}</span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">{zone.estTime}</td>
                    <td className="py-3.5 px-4">
                      {zone.fee === 0 ? (
                        <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          FREE
                        </span>
                      ) : (
                        <span className="font-bold text-[#0B1938]">Rs. {zone.fee}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-medium">Rs. {zone.minOrder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
