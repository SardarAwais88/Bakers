# 🎂 Grow Bakers & Sweets

> **Official web application for Grow Bakers & Sweets** — *“Bring the Best”*  
> Premium artisan bakery, custom designer cakes, traditional desi sweets & mithai, fresh morning savories, luxury festive hampers, and same-day delivery service in Lahore.

---

## 🌟 Overview

**Grow Bakers & Sweets** is a full-featured, responsive, and interactive digital storefront designed to deliver a seamless confectionery shopping experience. Crafted with a refined brand identity featuring deep navy (`#0B1938`), bold red (`#D91A2A`), warm cream (`#FAF7F2`), and artisan gold (`#D4AF37`), this application provides comprehensive eCommerce capabilities from catalog browsing to customized cake baking and live order tracking.

---

## 🚀 Key Features

### 🍰 1. Dynamic Interactive Catalog & Quick Views
- **9 Core Categories**: Cakes, Pastries, Brownies, Sweets & Mithai, Cookies, Bakery Savories, Artisan Breads, Gift Boxes, and Beverages.
- **Dynamic Filtering & Search**: Instant real-time search by name, category, description, and flavors, plus dietary filters (*100% Eggless, Sugar-Free, Chef Special, Contains Nuts*).
- **Customization Modal**: Select weights (Lbs/Kg), flavor variations, and add personalized cake piping messages / special instructions.

### 🎨 2. 3D-Style Custom Cake Designer
- **Step-by-Step Cake Builder**:
  - Select event occasion (Birthday, Wedding, Anniversary, Baby Shower, Corporate).
  - Configure tiers (1.5 Lbs to 3-Tier 10 Lbs).
  - Choose sponge flavor, signature filling, and frosting color palettes.
  - Add custom piping text, candle counts, reference photo uploads, and eggless preferences.
- **Live Price Estimator & Direct WhatsApp Inquiry**: Real-time pricing calculator with one-click direct sync to bakery master decorators on WhatsApp.

### 🛍️ 3. Shopping Bag & Seamless Checkout
- **Cart & Slide-Over Drawer**: Real-time quantity controls, size badges, custom notes, and promo voucher discounts (`SWEET15`).
- **Flexible Delivery Options**:
  - **Doorstep Delivery**: Express delivery zones across Lahore (Gulberg, DHA Phases 1–9, Model Town, Johar Town, Bahria Town, Cantt).
  - **Free Store Pickup**: Flagship bakery location pickup scheduling.
- **Multiple Payment Gateways**: Cash on Delivery (COD), JazzCash, Easypaisa, Meezan Bank Transfer, and Credit/Debit Cards.
- **Celebration Confetti & WhatsApp Receipt**: Instant formatted order summary with unique order reference (`GB-XXXXX`).

### 📦 4. Real-Time Order Tracker
- **5-Stage Visual Progress**: Order Confirmed ➔ In the Oven ➔ Quality Checked & Boxed ➔ Out for Delivery ➔ Delivered.
- **Live Courier Updates**: Delivery partner details, driver phone hotline, vehicle type, and estimated delivery timeline.

### 🎁 5. Customer Account & Loyalty Rewards
- Track previous order histories, re-order favorites with 1-click, and manage address books.
- **Sweet Rewards Club**: Earn points on every order, unlock tier badges (Silver, Gold, Platinum), and redeem Rs. 500 & Rs. 1,000 gift vouchers.

### 🛠️ 6. Store Manager / Operations Panel
- Manage live customer orders, update delivery statuses in real-time, toggle inventory in-stock availability, and monitor revenue metrics.

### 💬 7. Floating WhatsApp Support & Review Engine
- 1-click customer care assistant connected directly to the bakery dispatch hotline.
- Verified customer reviews with star ratings and an interactive feedback submission modal.

---

## 🎨 Brand Design System

| Element | Color Hex | Usage |
| :--- | :--- | :--- |
| **Primary Navy** | `#0B1938` | Headers, hero background, high-contrast typography |
| **Accent Red** | `#D91A2A` | Primary CTA buttons, price highlights, promotional badges |
| **Warm Canvas** | `#FAF7F2` | Background surface, subtle soft contrast sections |
| **Artisan Gold** | `#D4AF37` | Stars, luxury accents, badges, gift tier highlights |
| **Soft Cream** | `#FFF9F0` | Card hover states, banner container accents |

---

## 💻 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)
- **Visual FX**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 📁 Project Structure

```text
├── index.html                   # HTML entry point with metadata & OpenGraph tags
├── metadata.json                # Project configuration & application metadata
├── package.json                 # Dependencies & build scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS integration
└── src/
    ├── main.tsx                 # Main React DOM entry point
    ├── App.tsx                  # Root application orchestrator with global states
    ├── index.css                # Global Tailwind CSS imports & custom utility classes
    ├── types.ts                 # Shared TypeScript interfaces & types
    ├── data/
    │   └── bakeryData.ts        # Comprehensive catalog data, deals, gallery & mock orders
    └── components/
        ├── Header.tsx           # Top bar, search, order tracker & navigation menu
        ├── HeroSection.tsx      # High-impact carousel hero with CTA buttons
        ├── CategoriesSection.tsx# Visual category selector with item counts
        ├── MenuSection.tsx      # Filterable menu catalog with search & dietary tags
        ├── ProductCard.tsx      # Individual product card with size selectors & quick add
        ├── ProductModal.tsx     # Detailed product view with customization options
        ├── CustomCakeSection.tsx# Step-by-step custom cake designer & price estimator
        ├── OffersSection.tsx    # Special deals, promo codes & gift hampers
        ├── StorySection.tsx     # Heritage story, bakery milestones & quality pillars
        ├── WhyChooseUs.tsx      # Value propositions & customer testimonials
        ├── GallerySection.tsx   # Filterable bakery photo gallery with lightbox modal
        ├── DeliverySection.tsx  # Delivery zone tariffs & store pickup information
        ├── Footer.tsx           # Contact details, store hours, quick links & newsletter
        ├── CartDrawer.tsx       # Slide-over shopping cart with promo code calculator
        ├── CheckoutModal.tsx    # Multi-step checkout with delivery/pickup & payment modes
        ├── OrderTrackingModal.tsx# Live 5-stage order progress tracker
        ├── AccountModal.tsx     # User profile, past orders & loyalty reward points
        ├── AdminPanelModal.tsx  # Store operations management console
        ├── SearchModal.tsx      # Global product search modal with quick tags
        ├── WishlistModal.tsx    # Saved favorite products drawer
        ├── ReviewModal.tsx      # Customer feedback and review submission form
        └── WhatsAppButton.tsx   # Floating 1-click WhatsApp customer support widget
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/khanowais8888/grow-bakers-and-sweets.git
   cd grow-bakers-and-sweets
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Type Check / Lint**:
   ```bash
   npm run lint
   ```

---

## 📍 Store Information

- **Flagship Location**: Main Boulevard, Gulberg III / DHA Phase 5, Lahore, Pakistan
- **Hotline**: `+92 300 1234567` / `+92 42 35789012`
- **Store Hours**: Monday – Sunday, 9:00 AM – 11:00 PM
- **Email**: `orders@growbakers.com`

---

## 📄 License

This project is proprietary and created for **Grow Bakers & Sweets**. All rights reserved.
