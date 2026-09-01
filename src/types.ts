export type ProductCategory = 
  | 'all'
  | 'cakes'
  | 'pastries'
  | 'brownies'
  | 'sweets'
  | 'cookies'
  | 'bakery'
  | 'breads'
  | 'gift-boxes'
  | 'beverages';

export interface ProductOption {
  name: string;
  priceModifier: number; // additional cost in Rs.
}

export interface ProductSize {
  label: string; // e.g. "1 Lb (0.5 kg)", "2 Lbs (1 kg)", "Box of 6"
  price: number; // full price in Rs.
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number; // base price in Rs.
  originalPrice?: number; // for discounts
  image: string;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  discountPercentage?: number;
  sizes?: ProductSize[];
  flavors?: string[];
  dietary?: ('eggless' | 'sugar-free' | 'chef-special' | 'contains-nuts')[];
  ingredients?: string[];
  allergens?: string[];
  inStock: boolean;
}

export interface CartItem {
  cartId: string; // unique per configuration
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedFlavor?: string;
  customNote?: string;
}

export interface CustomCakeInquiry {
  id: string;
  occasion: string;
  tier: string;
  weight: string;
  baseFlavor: string;
  filling: string;
  theme: string;
  customMessage: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  referencePhotoName?: string;
  referencePhotoUrl?: string;
  candlesCount: number;
  eggless: boolean;
  customerName: string;
  customerPhone: string;
  customerWhatsApp: string;
  deliveryAddress: string;
  specialInstructions: string;
  estimatedPrice: number;
  status: 'pending' | 'reviewed' | 'confirmed';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  productName?: string;
  verifiedPurchase: boolean;
  avatarUrl?: string;
}

export interface OfferDeal {
  id: string;
  title: string;
  subtitle: string;
  discountText: string;
  code: string;
  image: string;
  validUntil: string;
  category: string;
  description: string;
  badge?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'cakes' | 'pastries' | 'sweets' | 'brownies' | 'interior' | 'packaging' | 'events';
  image: string;
  description: string;
}

export type OrderStatus = 'placed' | 'baking' | 'quality_check' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    cityArea: string;
    orderType: 'delivery' | 'pickup';
    pickupBranch?: string;
    deliveryDate: string;
    deliveryTimeSlot: string;
    specialNotes?: string;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: 'cod' | 'easypaisa' | 'jazzcash' | 'card' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid';
  orderStatus: OrderStatus;
  createdAt: string;
  trackingStep: number; // 1 to 5
  estimatedArrival?: string;
}

export interface DeliveryZone {
  area: string;
  fee: number;
  estTime: string;
  minOrder: number;
}
