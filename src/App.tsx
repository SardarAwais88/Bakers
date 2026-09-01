/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ALL_PRODUCTS, INITIAL_ORDERS, SPECIAL_OFFERS } from './data/bakeryData';
import { Product, CartItem, Order } from './types';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryBar } from './components/CategoryBar';
import { MenuSection } from './components/MenuSection';
import { CustomCakeSection } from './components/CustomCakeSection';
import { OffersSection } from './components/OffersSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { DeliverySection } from './components/DeliverySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Modals & Drawers
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { WishlistModal } from './components/WishlistModal';
import { AccountModal } from './components/AccountModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { SearchModal } from './components/SearchModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';

export default function App() {
  // Data states
  const [products, setProducts] = useState<Product[]>(ALL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    {
      cartId: 'init-1',
      productId: ALL_PRODUCTS[0].id,
      name: ALL_PRODUCTS[0].name,
      image: ALL_PRODUCTS[0].image,
      price: 2500,
      quantity: 1,
      selectedSize: '2 Lbs (Serves 6-8)',
      selectedFlavor: 'Classic Belgian Fudge',
    },
    {
      cartId: 'init-2',
      productId: ALL_PRODUCTS[5].id,
      name: ALL_PRODUCTS[5].name,
      image: ALL_PRODUCTS[5].image,
      price: 1200,
      quantity: 1,
      selectedSize: '1 Kg Box',
      selectedFlavor: 'Desi Ghee Classic',
    },
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([ALL_PRODUCTS[1], ALL_PRODUCTS[4]]);
  const [orders, setOrders] = useState<Record<string, Order>>(INITIAL_ORDERS);
  
  // Navigation & Category states
  const [activeNavTab, setActiveNavTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Coupon states
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('SWEET15');
  const [discountAmount, setDiscountAmount] = useState<number>(550);

  // Modal Visibility states
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (product: Product, size?: string, flavor?: string, quantity: number = 1, note?: string) => {
    const chosenSize = size || (product.sizes && product.sizes[0] ? product.sizes[0].label : 'Standard');
    const chosenFlavor = flavor || (product.flavors && product.flavors[0] ? product.flavors[0] : '');
    const matchedSizeObj = product.sizes?.find((s) => s.label === chosenSize);
    const unitPrice = matchedSizeObj ? matchedSizeObj.price : product.price;

    const existingIndex = cart.findIndex(
      (item) =>
        item.productId === product.id &&
        item.selectedSize === chosenSize &&
        item.selectedFlavor === chosenFlavor
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        cartId: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        productId: product.id,
        name: product.name,
        image: product.image,
        price: unitPrice,
        quantity: quantity,
        selectedSize: chosenSize,
        selectedFlavor: chosenFlavor || undefined,
        customNote: note,
      };
      setCart([...cart, newItem]);
    }
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter((item) => item.cartId !== cartId));
    } else {
      setCart(cart.map((item) => (item.cartId === cartId ? { ...item, quantity } : item)));
    }
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (target: Product | string) => {
    const productId = typeof target === 'string' ? target : target.id;
    const foundProduct = typeof target === 'string' ? products.find((p) => p.id === target) : target;
    if (!foundProduct) return;
    const exists = wishlist.some((item) => item.id === productId);
    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== productId));
    } else {
      setWishlist([...wishlist, foundProduct]);
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  // Coupon application logic
  const handleApplyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SWEET15') {
      setAppliedCoupon('SWEET15');
      const sub = cart.reduce((s, i) => s + i.price * i.quantity, 0);
      setDiscountAmount(Math.round(sub * 0.15));
      return true;
    } else if (clean === 'WEEKEND20') {
      setAppliedCoupon('WEEKEND20');
      const sub = cart.reduce((s, i) => s + i.price * i.quantity, 0);
      setDiscountAmount(Math.round(sub * 0.20));
      return true;
    } else if (clean === 'EID2026') {
      setAppliedCoupon('EID2026');
      setDiscountAmount(500);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  // Order submission
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => ({
      [newOrder.id]: newOrder,
      ...prev,
    }));
  };

  // Admin order status update
  const handleUpdateOrderStatus = (orderId: string, status: Order['orderStatus'], trackingStep: number) => {
    if (orders[orderId]) {
      setOrders((prev) => ({
        ...prev,
        [orderId]: {
          ...prev[orderId],
          orderStatus: status,
          trackingStep,
        },
      }));
    }
  };

  const handleToggleStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  // Navigation router
  const handleNavClick = (tabId: string) => {
    setActiveNavTab(tabId);

    // If it's a product category, filter menu and scroll to menu section
    const categoryMatches = ['cakes', 'pastries', 'brownies', 'sweets', 'cookies', 'bakery', 'breads', 'beverages', 'gift_boxes'];
    if (categoryMatches.includes(tabId)) {
      setSelectedCategory(tabId);
      const menuEl = document.getElementById('menu-section');
      menuEl?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (tabId === 'menu') {
      setSelectedCategory('all');
      document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (tabId === 'custom-cakes') {
      document.getElementById('custom-cakes-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (tabId === 'offers') {
      document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (tabId === 'about') {
      document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (tabId === 'gallery') {
      document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (tabId === 'delivery') {
      document.getElementById('delivery-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (tabId === 'contact') {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (tabId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0B1938] flex flex-col antialiased selection:bg-red-500 selection:text-white">
      
      {/* 1. TOP NAVBAR */}
      <Navbar
        activeTab={activeNavTab}
        onNavClick={handleNavClick}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOrderNow={() => {
          setSelectedCategory('all');
          document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        
        {/* 2. HERO SLIDER */}
        <Hero
          onOrderNow={() => {
            setSelectedCategory('all');
            document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreMenu={() => {
            document.getElementById('category-bar')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. CIRCULAR CATEGORY EXPLORER */}
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. OUR PRODUCTS / FULL MENU */}
        <MenuSection
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          wishlist={wishlist}
          wishlistIds={wishlist.map((w) => w.id)}
          onToggleWishlist={handleToggleWishlist}
          cartItemCounts={cart.reduce<Record<string, number>>((acc, item) => {
            acc[item.productId] = (acc[item.productId] || 0) + item.quantity;
            return acc;
          }, {})}
        />

        {/* 5. INTERACTIVE CUSTOM CAKE BUILDER */}
        <CustomCakeSection />

        {/* 6. OFFERS & DEALS (Includes 15% OFF Hero Promo Banner) */}
        <OffersSection
          onApplyCoupon={(code) => {
            handleApplyCoupon(code);
            setIsCartOpen(true);
          }}
          onOrderNow={() => {
            setSelectedCategory('cakes');
            document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 7. ABOUT US & STORY (4 Pillars + Store Interior) */}
        <AboutSection />

        {/* 8. WHY CHOOSE US (Same-day delivery, secure packaging, etc.) */}
        <WhyChooseUs />

        {/* 9. CUSTOMER REVIEWS & TESTIMONIALS */}
        <ReviewsSection />

        {/* 10. PHOTO & EVENT GALLERY (With Lightbox) */}
        <GallerySection />

        {/* 11. DELIVERY & PICKUP COVERAGE */}
        <DeliverySection />

        {/* 12. CONTACT US, STORE LOCATOR & MAP */}
        <ContactSection />

      </main>

      {/* 13. COMPREHENSIVE FOOTER */}
      <Footer
        onNavClick={handleNavClick}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* FLOATING WHATSAPP CHAT WIDGET */}
      <WhatsAppWidget />

      {/* MODALS & DRAWERS */}
      
      {/* Quick View & Customization Modal */}
      {quickViewProduct && (
        <ProductModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.some((w) => w.id === quickViewProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        discountAmount={discountAmount}
      />

      {/* Online Checkout & Instant Order Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cartSubtotal}
        discount={discountAmount}
        appliedCoupon={appliedCoupon}
        onOrderSuccess={handleOrderSuccess}
        onClearCart={handleClearCart}
      />

      {/* Live Order Tracker */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
      />

      {/* Saved Favorites / Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
        onClearWishlist={() => setWishlist([])}
      />

      {/* Customer Account & Loyalty Sweet Rewards */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        orders={Object.values(orders)}
        onTrackOrder={(orderId) => {
          setIsAccountOpen(false);
          setIsTrackingOpen(true);
        }}
      />

      {/* Bakery Store Manager Portal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        products={products}
        onToggleStock={handleToggleStock}
      />

      {/* Instant Search Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
