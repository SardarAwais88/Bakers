import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  Sparkles, 
  Check,
  Instagram,
  Facebook,
  Share2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Catering / Bulk Order Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'Catering / Bulk Order Inquiry',
        message: '',
      });
    }, 3000);
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent('Hello Grow Bakers & Sweets, I would like to get in touch regarding an order inquiry.');
    window.open(`https://wa.me/923001234567?text=${text}`, '_blank');
  };

  return (
    <section id="contact-section" className="py-14 bg-[#FAF7F2]/60 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D91A2A] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>We are Always Here for You</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1938] tracking-tight">
            Contact & Visit Our Bakery
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Reach out for party bookings, custom wedding orders, bulk corporate gifts, or visit our flagship live bakehouse.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 5 COLS: CONTACT INFO & HOURS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-xs space-y-5">
              <h3 className="text-lg font-extrabold text-[#0B1938] pb-3 border-b border-gray-100">
                Get in Touch
              </h3>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91A2A] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Call Order Hotline</p>
                  <a href="tel:+923001234567" className="text-sm font-bold text-[#0B1938] hover:text-[#D91A2A]">
                    +92 300 1234567
                  </a>
                  <p className="text-[11px] text-gray-500">Toll-free customer care & orders</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">WhatsApp Quick Orders</p>
                  <button 
                    onClick={handleWhatsAppClick}
                    className="text-sm font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    +92 300 1234567 (Chat with Us)
                  </button>
                  <p className="text-[11px] text-gray-500">Instant cake photos & custom quotes</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B1938] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Email Inquiries</p>
                  <a href="mailto:info@growbakers.com" className="text-sm font-bold text-[#0B1938] hover:text-[#D91A2A]">
                    info@growbakers.com
                  </a>
                  <p className="text-[11px] text-gray-500">Corporate & event catering</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Main Bakery & Showroom</p>
                  <p className="text-sm font-bold text-[#0B1938]">
                    123 Baker Street, Main Boulevard, Gulberg III
                  </p>
                  <p className="text-[11px] text-gray-500">Lahore, Punjab, Pakistan</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Opening Hours</p>
                  <p className="text-sm font-bold text-[#0B1938]">
                    Monday – Sunday: 9:00 AM – 11:00 PM
                  </p>
                  <p className="text-[11px] text-emerald-600 font-bold">Open on all public holidays & Eid</p>
                </div>
              </div>

            </div>

            {/* Social Links Box */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#0B1938]">Follow Our Sweet Journey</p>
                <p className="text-[11px] text-gray-500">@growbakersandsweets</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-rose-50 text-[#D91A2A] hover:bg-[#D91A2A] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-blue-50 text-[#0B1938] hover:bg-[#0B1938] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT 7 COLS: MAP PREVIEW & INQUIRY FORM */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Map Simulation */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xs">
              <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                {/* Visual Map Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] bg-slate-200" />
                
                {/* Pin marker on map */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="bg-[#D91A2A] text-white p-2.5 rounded-full shadow-xl border-2 border-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="bg-[#0B1938] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md mt-1">
                    Grow Bakers & Sweets Flagship
                  </span>
                </div>

                {/* Google Maps link CTA */}
                <a
                  href="https://maps.google.com/?q=Gulberg+III+Lahore"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#0B1938] hover:text-[#D91A2A] text-xs font-bold px-3.5 py-1.5 rounded-xl shadow border border-gray-200 transition-colors"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>

            {/* Direct Message / Catering Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
              <h3 className="text-lg font-extrabold text-[#0B1938] mb-1">
                Send Us a Message / Catering Request
              </h3>
              <p className="text-xs text-gray-500 mb-5">
                We respond to all online inquiries within 30 minutes during shop hours.
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 animate-in zoom-in-95">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-bold text-gray-900">Message Successfully Sent!</h4>
                  <p className="text-xs text-gray-600">
                    Thank you for reaching out. Our manager will contact you promptly at <b>{formData.phone}</b>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Asad Malik"
                        className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 0300 1234567"
                        className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. asad@example.com"
                        className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                      >
                        <option value="Catering / Bulk Order Inquiry">Catering / Bulk Order Inquiry</option>
                        <option value="Custom Wedding Cake Quote">Custom Wedding Cake Quote</option>
                        <option value="Corporate Gift Hampers">Corporate Gift Hampers</option>
                        <option value="General Question / Feedback">General Question / Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Your Message / Requirements *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the event date, number of guests, or custom requests..."
                      className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0B1938] hover:bg-[#D91A2A] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Grow Bakers</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
