import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Youtube, 
  Send, 
  Check, 
  CreditCard,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavClick: (tabId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenAdmin }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-[#0B1938] text-white">
      
      {/* 1. NEWSLETTER & SOCIAL STRIP (Exact from mockup) */}
      <div className="border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Logo in strip */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Logo size="md" variant="white" />
          </div>

          {/* Newsletter Box */}
          <div className="w-full lg:max-w-md">
            <p className="text-xs font-bold text-center lg:text-left mb-1 text-white">
              Subscribe to Our Newsletter
            </p>
            <p className="text-[11px] text-gray-300 text-center lg:text-left mb-3">
              Get the latest updates, offers and sweet surprises!
            </p>

            {isSubscribed ? (
              <div className="p-2.5 bg-emerald-900/60 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you for subscribing to sweet deals!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="flex-1 bg-white text-gray-900 text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-amber-500 text-[#0B1938] font-black text-xs uppercase px-5 py-2.5 rounded-lg tracking-wider transition-colors cursor-pointer shrink-0 shadow"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Social Follow */}
          <div className="flex flex-col items-center lg:items-end gap-2">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Follow Us</p>
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D91A2A] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D91A2A] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN FOOTER COLUMNS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              {[
                { id: 'home', label: 'Home' },
                { id: 'menu', label: 'Our Full Menu' },
                { id: 'custom-cakes', label: 'Custom Cakes Studio' },
                { id: 'gift-boxes', label: 'Gift Boxes & Hampers' },
                { id: 'offers', label: 'Offers & Discounts' },
                { id: 'gallery', label: 'Photo Gallery' },
                { id: 'about', label: 'About Us & Story' },
                { id: 'contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavClick(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Our Menu Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Our Menu
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              {[
                { id: 'cakes', label: '🎂 Signature Cakes' },
                { id: 'pastries', label: '🧁 Cream Pastries' },
                { id: 'brownies', label: '🍫 Fudgy Brownies' },
                { id: 'sweets', label: '🍬 Desi Ghee Mithai' },
                { id: 'cookies', label: '🍪 Biscuits & Cookies' },
                { id: 'bakery', label: '🥐 Patties & Croissants' },
                { id: 'breads', label: '🍞 Fresh Sourdough & Breads' },
                { id: 'beverages', label: '🥤 Karak Chai & Cold Brews' },
              ].map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onNavClick(cat.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Us Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="tel:+923001234567" className="hover:text-amber-300 font-bold">
                  +92 300 1234567
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:info@growbakers.com" className="hover:text-amber-300">
                  info@growbakers.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>123 Baker Street, Main Blvd, Gulberg III, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-amber-200">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Mon - Sun: 9:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>

          {/* Col 4: We Accept & Payment Logos (Exact from mockup) */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              We Accept
            </h4>
            <p className="text-xs text-gray-300">
              100% secure payment gateways & cash on delivery across Lahore.
            </p>

            {/* Payment Method Badges Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {/* Visa */}
              <div className="bg-white text-[#0B1938] px-2.5 py-1.5 rounded-md font-black text-xs flex items-center justify-center shadow-xs">
                <span className="text-[#1A1F71] italic text-sm font-black">VISA</span>
              </div>
              {/* Mastercard */}
              <div className="bg-white text-gray-900 px-2.5 py-1.5 rounded-md flex items-center justify-center gap-1 shadow-xs">
                <div className="flex -space-x-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B]/90" />
                </div>
                <span className="text-[10px] font-bold text-gray-800">Mastercard</span>
              </div>
              {/* Meezan Bank */}
              <div className="bg-[#1C3F3A] text-amber-300 border border-amber-400/40 px-2 py-1.5 rounded-md text-[10px] font-bold text-center">
                Meezan Bank
              </div>
              {/* Easypaisa */}
              <div className="bg-[#00A651] text-white px-2 py-1.5 rounded-md text-[10px] font-bold text-center">
                easypaisa
              </div>
              {/* JazzCash */}
              <div className="bg-[#E30613] text-white px-2 py-1.5 rounded-md text-[10px] font-bold text-center">
                JazzCash
              </div>
              {/* Cash On Delivery */}
              <div className="bg-slate-700 text-white px-2 py-1.5 rounded-md text-[10px] font-bold text-center">
                Cash On Delivery
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Store Manager Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Grow Bakers & Sweets. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>FSSAI / Halal Certified</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
