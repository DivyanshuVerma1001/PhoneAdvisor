import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Smartphone, Search, Sparkles } from 'lucide-react';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import { products } from './data/products';
import { getAIRecommendations } from './services/aiService';

/**
 * Main App Component
 * Manages state and orchestrates the phone recommendation flow
 */
function App() {
  const [recommendedIds, setRecommendedIds] = useState([]);
  const [recommendationReasons, setRecommendationReasons] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  /**
   * Handles the search/recommendation process
   * @param {string} preference - User's phone preference text (can be in English or Hindi)
   */
  const handleSearch = async (preference) => {
    setIsLoading(true);
    setHasSearched(true);
    setRecommendedIds([]);
    setRecommendationReasons({});

    try {
      // Call AI service to get recommendations with reasons
      const result = await getAIRecommendations(preference, products);
      
      if (result.productIds.length === 0) {
        toast.success('No specific matches found, but here are all our products!');
      } else {
        toast.success(`Found ${result.productIds.length} recommendation(s) for you!`);
      }

      setRecommendedIds(result.productIds);
      setRecommendationReasons(result.reasons);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast.error(error.message || 'Failed to get recommendations. Please try again.');
      setRecommendedIds([]);
      setRecommendationReasons({});
    } finally {
      setIsLoading(false);
    }
  };

  // Filter recommended products
  const recommendedProducts = products.filter((product) =>
    recommendedIds.includes(product.id)
  );

  // Get all other products (non-recommended)
  const otherProducts = products.filter(
    (product) => !recommendedIds.includes(product.id)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Smartphone className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold text-center text-white">
              Phone AI Recommender
            </h1>
          </div>
          <p className="text-center text-gray-300 text-lg">
            Tell us what you're looking , and AI will find the perfect phone for you!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Recommended Section */}
        {hasSearched && recommendedProducts.length > 0 && (
          <section className="mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <Sparkles className="w-8 h-8 text-blue-400" />
              <span>Recommended For You</span>
            </h2>
            
            {/* Display recommended products with reasons inside cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isRecommended={true}
                  recommendationReason={recommendationReasons[product.id]}
                />
              ))}
            </div>
          </section>
        )}

        {/* No Recommendations Message */}
        {hasSearched && recommendedProducts.length === 0 && !isLoading && (
          <div className="text-center py-12 mb-12 animate-fade-in">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-auto border border-gray-700">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-white">No Specific Matches Found</h3>
              <p className="text-gray-400">
                We couldn't find exact matches, but check out all our amazing phones below!
              </p>
            </div>
          </div>
        )}

        {/* All Products Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
            <Smartphone className="w-8 h-8 text-blue-400" />
            <span>
              {hasSearched && recommendedProducts.length > 0
                ? 'All Products'
                : 'Available Phones'}
            </span>
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <svg
                  className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="text-gray-400">AI is analyzing your preferences...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {hasSearched && recommendedProducts.length > 0
                ? otherProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isRecommended={false}
                    />
                  ))
                : products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isRecommended={false}
                    />
                  ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-16 py-8 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>Powered by Google Gemini AI • Built with React & Vite</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

