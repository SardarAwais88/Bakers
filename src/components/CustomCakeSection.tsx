import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Calendar, 
  Clock, 
  Check, 
  Phone, 
  Send, 
  Cake as CakeIcon, 
  HelpCircle,
  Image as ImageIcon,
  MessageCircle,
  Heart
} from 'lucide-react';
import { CustomCakeInquiry } from '../types';

interface CustomCakeSectionProps {
  onSubmitInquiry: (inquiry: Partial<CustomCakeInquiry>) => void;
}

export const CustomCakeSection: React.FC<CustomCakeSectionProps> = ({ onSubmitInquiry }) => {
  // Builder state
  const [occasion, setOccasion] = useState('Birthday Celebration');
  const [sizeTier, setSizeTier] = useState('2.5 Lbs (Serves 8-10)');
  const [flavor, setFlavor] = useState('Belgian Chocolate Fudge');
  const [filling, setFilling] = useState('Rich Chocolate Ganache & Crunch');
  const [theme, setTheme] = useState('Modern Luxury Floral');
  const [customMessage, setCustomMessage] = useState('Happy Birthday!');
  const [eggless, setEggless] = useState(false);
  const [candlesCount, setCandlesCount] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('4:00 PM - 7:00 PM');
  
  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Uploaded photo state
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [uploadedPhotoName, setUploadedPhotoName] = useState<string>('');
  
  // Form submission feedback
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Preset inspiration samples
  const inspirationPresets = [
    {
      title: 'Belgian Chocolate Drip & Macarons',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
      flavor: 'Belgian Chocolate Fudge',
      theme: 'Chocolate Drip & Gold Leaf'
    },
    {
      title: 'Vintage Ivory Floral 2-Tier',
      image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=400&q=80',
      flavor: 'Red Velvet Cream Cheese',
      theme: 'Vintage Ivory Floral'
    },
    {
      title: 'Lotus Biscoff Crown Delight',
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=400&q=80',
      flavor: 'Lotus Biscoff Speculoos',
      theme: 'Lotus Caramel Crumble'
    },
    {
      title: 'Pastel Dream Kids Cartoon',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=400&q=80',
      flavor: 'Vanilla Strawberry Swirl',
      theme: 'Cute Pastel Wonderland'
    }
  ];

  // Dynamic Price Estimator logic
  const calculateEstimatedPrice = () => {
    let base = 2500;
    const tierStr = sizeTier || '';
    const flavorStr = flavor || '';
    const fillingStr = filling || '';

    if (tierStr.includes('1.5 Lbs')) base = 2200;
    else if (tierStr.includes('2.5 Lbs')) base = 3200;
    else if (tierStr.includes('4 Lbs')) base = 4800;
    else if (tierStr.includes('2-Tier 6 Lbs')) base = 7500;
    else if (tierStr.includes('3-Tier 10 Lbs')) base = 13000;

    if (flavorStr.includes('Lotus') || flavorStr.includes('Ferrero')) base += 400;
    if (fillingStr.includes('Pistachio') || fillingStr.includes('Nutella')) base += 250;
    if (eggless) base += 200;

    return base;
  };

  const estimatedPrice = calculateEstimatedPrice();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedPhotoName(file.name);
      const fakeUrl = URL.createObjectURL(file);
      setUploadedPhotoUrl(fakeUrl);
    }
  };

  const handleApplyPreset = (preset: typeof inspirationPresets[0]) => {
    setTheme(preset.theme);
    setFlavor(preset.flavor);
    setUploadedPhotoUrl(preset.image);
    setUploadedPhotoName(preset.title);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Please provide your name and phone number for custom cake coordination.');
      return;
    }

    const inquiry: Partial<CustomCakeInquiry> = {
      occasion,
      tier: sizeTier,
      weight: sizeTier.split('(')[0].trim(),
      baseFlavor: flavor,
      filling,
      theme,
      customMessage,
      deliveryDate: deliveryDate || 'Within 2-3 days',
      deliveryTimeSlot,
      referencePhotoName: uploadedPhotoName,
      referencePhotoUrl: uploadedPhotoUrl || undefined,
      candlesCount,
      eggless,
      customerName,
      customerPhone,
      customerWhatsApp: customerPhone,
      deliveryAddress,
      specialInstructions,
      estimatedPrice,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    onSubmitInquiry(inquiry);
    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const message = `Hello Grow Bakers & Sweets! I want to inquire about a Custom Cake:
- Occasion: ${occasion}
- Size/Tier: ${sizeTier}
- Flavor: ${flavor}
- Filling: ${filling}
- Theme: ${theme}
- Message on Cake: "${customMessage}"
- Eggless: ${eggless ? 'Yes' : 'No'}
- Required Date: ${deliveryDate || 'Flexible'}
- Estimated Price: Rs. ${estimatedPrice}
- Name: ${customerName || 'Customer'}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923001234567?text=${encoded}`, '_blank');
  };

  return (
    <section id="custom-cakes-section" className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D91A2A] text-xs font-bold uppercase tracking-wider mb-2">
            <CakeIcon className="w-3.5 h-3.5" />
            <span>Custom Cake Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1938] tracking-tight">
            Design Your Dream Cake
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Birthdays, weddings, anniversaries or corporate galas — customize every single layer, flavor, filling and theme with our master decorators.
          </p>
        </div>

        {/* Builder Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: INTERACTIVE BUILDER FORM */}
          <div className="lg:col-span-7 bg-[#FAF7F2]/70 rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-xs space-y-6">
            
            {/* Step 1: Occasion & Theme */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-[#0B1938] uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0B1938] text-white flex items-center justify-center text-[10px]">1</span>
                <span>Select Occasion & Style Theme</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Birthday Celebration',
                  'Royal Wedding Tier',
                  'Anniversary Romantic',
                  'Kids 3D Cartoon',
                  'Graduation Party',
                  'Eid & Festive Joy'
                ].map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border cursor-pointer ${
                      occasion === occ
                        ? 'bg-[#0B1938] text-white border-[#0B1938] shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Size & Tier */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-[#0B1938] uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0B1938] text-white flex items-center justify-center text-[10px]">2</span>
                <span>Cake Weight & Servings</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { label: '1.5 Lbs (Serves 4-6)', base: 'Rs. 2,200' },
                  { label: '2.5 Lbs (Serves 8-10)', base: 'Rs. 3,200' },
                  { label: '4 Lbs (Serves 12-16)', base: 'Rs. 4,800' },
                  { label: '2-Tier 6 Lbs (Serves 20-25)', base: 'Rs. 7,500' },
                  { label: '3-Tier 10 Lbs (Serves 40+)', base: 'Rs. 13,000' },
                ].map((tier) => (
                  <button
                    key={tier.label}
                    type="button"
                    onClick={() => setSizeTier(tier.label)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      sizeTier === tier.label
                        ? 'bg-red-50 border-[#D91A2A] text-[#0B1938] ring-1 ring-[#D91A2A]'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <p className="text-xs font-bold text-[#0B1938]">{tier.label.split('(')[0]}</p>
                    <p className="text-[11px] text-gray-500">{tier.label.split('(')[1]?.replace(')', '')}</p>
                    <p className="text-xs font-extrabold text-[#D91A2A] mt-1">{tier.base}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Base Flavor & Premium Filling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-[#0B1938] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0B1938] text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Base Cake Flavor</span>
                </label>
                <select
                  value={flavor}
                  onChange={(e) => setFlavor(e.target.value)}
                  className="w-full text-xs font-medium p-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20 focus:border-[#D91A2A]"
                >
                  <option value="Belgian Chocolate Fudge">Belgian Chocolate Fudge</option>
                  <option value="Royal Lotus Biscoff Speculoos">Royal Lotus Biscoff Speculoos (+Rs. 400)</option>
                  <option value="Red Velvet Cream Cheese">Red Velvet Cream Cheese</option>
                  <option value="Ferrero Rocher Hazelnut Praline">Ferrero Rocher Hazelnut Praline (+Rs. 400)</option>
                  <option value="Fresh Mango Vanilla Chiffon">Fresh Mango Vanilla Chiffon</option>
                  <option value="Salted Caramel Espresso Crunch">Salted Caramel Espresso Crunch</option>
                  <option value="Classic Victoria Strawberry">Classic Victoria Strawberry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-[#0B1938] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0B1938] text-white flex items-center justify-center text-[10px]">4</span>
                  <span>Inner Filling & Texture</span>
                </label>
                <select
                  value={filling}
                  onChange={(e) => setFilling(e.target.value)}
                  className="w-full text-xs font-medium p-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20 focus:border-[#D91A2A]"
                >
                  <option value="Rich Chocolate Ganache & Crunch">Rich Chocolate Ganache & Crunch</option>
                  <option value="Silky Philadelphia Cream Cheese">Silky Philadelphia Cream Cheese</option>
                  <option value="Nutella Swirl & Crispy Wafer">Nutella Swirl & Crispy Wafer (+Rs. 250)</option>
                  <option value="Pistachio Praline Mousse">Pistachio Praline Mousse (+Rs. 250)</option>
                  <option value="Wild Berry Strawberry Compote">Wild Berry Strawberry Compote</option>
                  <option value="Salted Butter Caramel Drizzle">Salted Butter Caramel Drizzle</option>
                </select>
              </div>
            </div>

            {/* Step 4: Custom Message & Dietary */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-[#0B1938] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0B1938] text-white flex items-center justify-center text-[10px]">5</span>
                  <span>Message on Cake & Card</span>
                </label>
                
                {/* Eggless toggle */}
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0B1938]">
                  <input
                    type="checkbox"
                    checked={eggless}
                    onChange={(e) => setEggless(e.target.checked)}
                    className="w-4 h-4 text-[#D91A2A] rounded border-gray-300 focus:ring-[#D91A2A]"
                  />
                  <span>🌱 100% Eggless (+Rs. 200)</span>
                </label>
              </div>

              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="e.g. Happy 25th Birthday Ahad! ❤️"
                maxLength={60}
                className="w-full text-xs p-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20 focus:border-[#D91A2A]"
              />
            </div>

            {/* Step 5: Upload Cake Reference Photo or choose inspiration */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-[#0B1938] uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0B1938] text-white flex items-center justify-center text-[10px]">6</span>
                <span>Upload Reference Photo / Design</span>
              </label>

              {/* Upload Box */}
              <div className="border-2 border-dashed border-gray-300 hover:border-[#D91A2A] bg-white rounded-2xl p-4 text-center transition-colors">
                <input
                  type="file"
                  id="cake-photo-upload"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="cake-photo-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-[#D91A2A] flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0B1938] hover:underline">
                      Click to upload cake image
                    </span>
                    <span className="text-xs text-gray-500"> or drag and drop</span>
                  </div>
                  <p className="text-[10px] text-gray-400">PNG, JPG, JPEG up to 10MB</p>
                </label>

                {uploadedPhotoUrl && (
                  <div className="mt-3 p-2 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                    <div className="flex items-center gap-2">
                      <img src={uploadedPhotoUrl} alt="Preview" className="w-8 h-8 rounded-md object-cover" />
                      <span className="font-semibold line-clamp-1">{uploadedPhotoName || 'Uploaded Design'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedPhotoUrl(null);
                        setUploadedPhotoName('');
                      }}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Inspiration Presets */}
              <div>
                <p className="text-[11px] font-bold text-gray-500 mb-2">Or select from popular design themes:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {inspirationPresets.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleApplyPreset(preset)}
                      className="group cursor-pointer rounded-xl overflow-hidden border border-gray-200 bg-white hover:border-[#D91A2A] hover:shadow-xs transition-all"
                    >
                      <img src={preset.image} alt={preset.title} className="w-full h-16 object-cover group-hover:scale-105 transition-transform" />
                      <div className="p-1.5 text-center">
                        <p className="text-[10px] font-bold text-gray-800 line-clamp-1">{preset.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 6: Customer details & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Sarah Khan"
                  className="w-full text-xs p-2.5 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. +92 300 1234567"
                  className="w-full text-xs p-2.5 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">Required Delivery Date</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">Preferred Time Slot</label>
                <select
                  value={deliveryTimeSlot}
                  onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                >
                  <option value="11:00 AM - 2:00 PM">Morning (11:00 AM - 2:00 PM)</option>
                  <option value="2:00 PM - 5:00 PM">Afternoon (2:00 PM - 5:00 PM)</option>
                  <option value="5:00 PM - 8:00 PM">Evening (5:00 PM - 8:00 PM)</option>
                  <option value="8:00 PM - 10:30 PM">Night (8:00 PM - 10:30 PM)</option>
                </select>
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS: LIVE SUMMARY, PRICE ESTIMATE & ACTIONS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-lg space-y-5 sticky top-24">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase">Live Estimate</span>
                  <h3 className="text-xl font-extrabold text-[#0B1938]">Custom Cake Summary</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-red-50 text-[#D91A2A] flex items-center justify-center font-bold">
                  🎂
                </div>
              </div>

              {/* Specs List */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Occasion:</span>
                  <span className="font-bold text-gray-900">{occasion}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Size & Tier:</span>
                  <span className="font-bold text-gray-900">{sizeTier}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Flavor:</span>
                  <span className="font-bold text-gray-900 text-right">{flavor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Filling:</span>
                  <span className="font-bold text-gray-900 text-right">{filling}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Eggless:</span>
                  <span className="font-bold text-gray-900">{eggless ? 'Yes (Egg-free sponge)' : 'Standard'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Message:</span>
                  <span className="font-bold text-[#D91A2A] italic">"{customMessage || 'None'}"</span>
                </div>
                {deliveryDate && (
                  <div className="flex justify-between py-1 border-b border-gray-50">
                    <span className="text-gray-500">Target Date:</span>
                    <span className="font-bold text-emerald-700">{deliveryDate} ({deliveryTimeSlot.split(' ')[0]})</span>
                  </div>
                )}
              </div>

              {/* Price Calculation Box */}
              <div className="p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl border border-red-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-600 block">Estimated Cake Total</span>
                  <span className="text-2xl font-black text-[#D91A2A]">
                    Rs. {estimatedPrice.toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] bg-white px-2 py-1 rounded-md text-gray-500 shadow-2xs font-semibold">
                  Free Card & Candles Included
                </span>
              </div>

              {/* Submission State Message */}
              {isSubmitted ? (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-center space-y-2 animate-in zoom-in-95">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto font-black">
                    ✓
                  </div>
                  <h4 className="font-bold text-sm">Custom Cake Inquiry Received!</h4>
                  <p className="text-xs text-emerald-700">
                    Our master decorator will call / WhatsApp you at <b>{customerPhone}</b> within 15 minutes to confirm the fondant details.
                  </p>
                  <button
                    onClick={handleWhatsAppDirect}
                    className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Chat Now</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {/* Primary Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full py-3.5 bg-[#D91A2A] hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Custom Cake Order</span>
                  </button>

                  {/* Instant WhatsApp Order Button */}
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="w-full py-3 bg-[#25D366] hover:bg-[#20b858] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Order</span>
                  </button>

                  <p className="text-[11px] text-gray-400 text-center">
                    Need help? Call our master cake hotline: <a href="tel:+923001234567" className="font-bold text-[#0B1938] hover:underline">+92 300 1234567</a>
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
