import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Phone, 
  Clock, 
  Truck, 
  Percent, 
  Menu as MenuIcon, 
  X, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenTracking: () => void;
  onOpenOrderNow: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onOpenTracking,
  onOpenOrderNow,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'cakes', label: 'Cakes' },
    { id: 'sweets', label: 'Sweets' },
    { id: 'bakery', label: 'Bakery' },
    { id: 'gift-boxes', label: 'Gift Boxes' },
    { id: 'custom-cakes', label: 'Custom Cakes' },
    { id: 'offers', label: 'Offers' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    // Scroll smoothly to target or top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm transition-all">
      {/* 1. TOP UTILITY ANNOUNCEMENT BAR */}
      <div className="bg-[#0B1938] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-[#0B1938]/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left Announcement */}
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1.5 text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Freshly Baked, Made with Love ❤️</span>
            </span>
            <span className="hidden md:inline text-gray-400">|</span>
            <span className="hidden md:inline text-gray-300 text-[11px]">
              Same-day 2-hr express delivery across Lahore
            </span>
          </div>

          {/* Right Links */}
          <div className="flex items-center gap-4 text-gray-300 text-[11px]">
            <button 
              onClick={onOpenTracking}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>Track Order</span>
            </button>
            <button 
              onClick={() => handleNavClick('offers')}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Percent className="w-3.5 h-3.5 text-amber-400" />
              <span>Offers & Deals</span>
            </button>
            <a 
              href="tel:+923001234567" 
              className="hidden lg:flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+92 300 1234567</span>
            </a>
            <button 
              onClick={onOpenAdmin}
              className="hidden xl:flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700/60 rounded px-1.5 py-0.5 text-[10px]"
              title="Bakery Manager Console"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="cursor-pointer transition-transform hover:opacity-95"
        >
          <Logo size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-2.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#D91A2A] bg-red-50/80 font-bold'
                    : 'text-[#0B1938] hover:text-[#D91A2A] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Prominent Order Now */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full text-gray-700 hover:text-[#D91A2A] hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Search bakery items"
            title="Search products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Account Button */}
          <button
            onClick={onOpenAccount}
            className="p-2 rounded-full text-gray-700 hover:text-[#D91A2A] hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Customer Account"
            title="My Account"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 rounded-full text-gray-700 hover:text-[#D91A2A] hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#D91A2A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full text-gray-700 hover:text-[#D91A2A] hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Shopping Cart"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#0B1938] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Prominent Order Now Button */}
          <button
            onClick={onOpenOrderNow}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#0B1938] hover:bg-[#D91A2A] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Order Now</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE MENU COLLAPSIBLE */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-100">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                  activeTab === link.id
                    ? 'bg-red-50 text-[#D91A2A] font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderNow();
              }}
              className="w-full bg-[#D91A2A] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Now</span>
            </button>
            
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 px-1">
              <button onClick={() => { setMobileMenuOpen(false); onOpenTracking(); }} className="flex items-center gap-1 hover:text-[#0B1938]">
                <Truck className="w-3.5 h-3.5 text-[#D91A2A]" />
                <span>Track Order</span>
              </button>
              <button onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }} className="flex items-center gap-1 hover:text-[#0B1938]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
