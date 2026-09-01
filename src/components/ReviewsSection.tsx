import React, { useState } from 'react';
import { Star, Sparkles, ChevronLeft, ChevronRight, Quote, Plus, Check, ShieldCheck } from 'lucide-react';
import { Review } from '../types';
import { CUSTOMER_REVIEWS } from '../data/bakeryData';

interface ReviewsSectionProps {
  onAddReview?: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = () => {
  const [reviews, setReviews] = useState<Review[]>(CUSTOMER_REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [productName, setProductName] = useState('Signature Chocolate Fudge Cake');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name,
      location: location || 'Lahore, Pakistan',
      rating,
      date: 'Just now',
      comment,
      productName,
      verifiedPurchase: true,
    };

    setReviews([newRev, ...reviews]);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowReviewModal(false);
      setName('');
      setLocation('');
      setComment('');
    }, 1200);
  };

  return (
    <section id="reviews-section" className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-amber-700 text-xs font-serif italic mb-1">
              <span>What Our Customers Say</span>
              <Sparkles className="w-3 h-3 text-amber-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1938] tracking-tight">
              Happy Customers
            </h2>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-red-50 border border-amber-200 text-[#0B1938] hover:text-[#D91A2A] text-xs font-bold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Cards Grid matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-red-100 absolute top-4 right-4" />

              <div className="space-y-3 relative z-10">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-[#0B1938]">
                      — {review.name}
                    </p>
                    {review.verifiedPurchase && (
                      <span className="inline-flex items-center text-[10px] text-emerald-600 font-semibold" title="Verified Customer">
                        <ShieldCheck className="w-3 h-3 ml-0.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400">{review.location}</p>
                </div>

                {review.productName && (
                  <span className="text-[10px] bg-red-50 text-[#D91A2A] font-semibold px-2 py-0.5 rounded">
                    {review.productName.split(' ')[0]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trust summary pill */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-[#0B1938]">4.9 / 5.0</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span>Based on <b>1,850+ verified customer ratings</b> across Pakistan</span>
        </div>

      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-extrabold text-[#0B1938]">Share Your Sweet Experience</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-black font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {isSuccess ? (
              <div className="text-center py-8 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h4 className="font-bold text-gray-900">Thank you for your review!</h4>
                <p className="text-xs text-gray-500">Your feedback helps us bake even better memories.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 pt-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Your Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-gray-600 ml-2">{rating} Stars</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Product Enjoyed</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Signature Chocolate Fudge Cake"
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mariam Siddiqui"
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">City / Area</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. DHA Phase 6, Lahore"
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Your Feedback / Review *</label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="How was the taste, freshness, and packaging?"
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D91A2A]/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#D91A2A] hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer transition-all"
                >
                  Submit Review
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
