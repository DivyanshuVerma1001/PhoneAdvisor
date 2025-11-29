import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

/**
 * SearchBar Component
 * Handles user input for phone preferences and triggers AI recommendations
 * @param {Function} onSearch - Callback function when user clicks "Get Recommendation"
 * @param {boolean} isLoading - Loading state to disable button during API calls
 */
const SearchBar = ({ onSearch, isLoading }) => {
  const [preference, setPreference] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (preference.trim()) {
      onSearch(preference.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Input Field */}
        <input
          type="text"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          placeholder="Tell your preference in English or Hindi (हिंदी): e.g., phone under Rs. 50000 with good camera or ₹50000 से कम अच्छा कैमरा वाला फोन"
          className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
          disabled={isLoading}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !preference.trim()}
          className={`
            px-8 py-4 bg-blue-600
            text-white font-semibold rounded-lg
            hover:bg-blue-700
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300
            shadow-md hover:shadow-lg
            flex items-center justify-center gap-2
            min-w-[200px]
          `}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Getting Recommendations...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Get Recommendation</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

