import React from 'react';
import { Star, Award, Lightbulb } from 'lucide-react';

/**
 * ProductCard Component
 * Displays individual phone product information in a card layout
 * @param {Object} product - Product object containing all product details
 * @param {boolean} isRecommended - Whether this product is recommended by AI
 * @param {string} recommendationReason - Reason why this product is recommended (if applicable)
 */
const ProductCard = ({ product, isRecommended = false, recommendationReason = null }) => {
  // Convert USD to INR (approximate conversion rate: 1 USD = 83 INR)
  const convertToINR = (usdPrice) => {
    return Math.round(usdPrice * 83);
  };
  // Generate star rating display using SVG icons
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 fill-none text-gray-600" />
      );
    }

    return stars;
  };

  return (
    <div
      className={`
        relative bg-gray-800 rounded-lg p-6 shadow-md
        transition-all duration-300 hover:shadow-lg hover:border-gray-600
        border ${isRecommended ? 'border-blue-500' : 'border-gray-700'}
        animate-fade-in
      `}
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5">
          <Award className="w-3 h-3" />
          <span>Recommended</span>
        </div>
      )}

      {/* Product Image */}
      <div className="mb-4 flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-48 h-48 object-contain rounded-lg bg-gray-900 p-4"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200x200/1f2937/ffffff?text=Phone';
          }}
        />
      </div>

      {/* Brand */}
      <div className="text-sm text-gray-400 mb-1">{product.brand}</div>

      {/* Product Name */}
      <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>

      {/* Price */}
      <div className="text-2xl font-bold text-blue-400 mb-4">
        Rs. {convertToINR(product.price).toLocaleString('en-IN')}
      </div>

      {/* Specs */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">RAM:</span>
          <span className="text-white font-semibold">{product.specs.ram}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Storage:</span>
          <span className="text-white font-semibold">{product.specs.storage}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Battery:</span>
          <span className="text-white font-semibold">{product.specs.battery}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Processor:</span>
          <span className="text-white font-semibold">{product.specs.processor}</span>
        </div>
      </div>

      {/* Recommendation Reason - Inside Card */}
      {isRecommended && recommendationReason && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-300 mb-1.5">
                  Why this phone is perfect for you:
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {recommendationReason}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rating */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700">
        <div className="flex gap-0.5">{renderStars(product.rating)}</div>
        <span className="text-gray-400 text-sm">({product.rating})</span>
      </div>
    </div>
  );
};

export default ProductCard;

