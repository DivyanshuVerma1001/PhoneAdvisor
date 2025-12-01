/**
 * AI Service for Gemini API Integration
 * Handles communication with Google Gemini API using official GenAI SDK
 */
import { GoogleGenAI } from "@google/genai";

// Initialize the client with API key (hardcoded as per requirements)
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

/**
 * Fetches AI recommendations from Gemini API
 * @param {string} userPreference - User's phone preference text (can be in English or Hindi)
 * @param {Array} products - Array of all available products
 * @returns {Promise<Object>} Object containing recommended product IDs and reasons
 */
export const getAIRecommendations = async (userPreference, products) => {
  // Detect if user input is in Hindi (basic detection)
  const isHindi = /[\u0900-\u097F]/.test(userPreference);
  const responseLanguage = isHindi ? 'Hindi' : 'English';

  // Prepare the prompt for Gemini API with bilingual support
  const prompt = `User preference (respond in ${responseLanguage}): ${userPreference}

Here is the list of products in JSON:

${JSON.stringify(products, null, 2)}

Analyze the user's preference and select the most relevant products. Consider factors like:
- Price range mentioned
- Camera quality if mentioned
- Performance requirements
- Brand preferences
- Budget constraints
- Any specific features mentioned
- Battery backup
- Price-to-value ratio

IMPORTANT: 
1. Respond in ${responseLanguage} (the same language as the user's input)
2. Return a JSON object with this exact structure:
{
  "recommendations": [
    {
      "productId": 1,
      "reason": "Brief explanation in ${responseLanguage} why this phone is perfect - mention specific highlights like performance, camera, battery, price-to-value, etc."
    }
  ]
}

Example response in English:
{
  "recommendations": [
    {
      "productId": 4,
      "reason": "Excellent price-to-value with 16GB RAM and Snapdragon 8 Gen 3 processor. Great for performance enthusiasts on a budget. 5400 mAh battery ensures all-day usage."
    },
    {
      "productId": 7,
      "reason": "Perfect budget option under $500 with good camera quality and 5000 mAh battery. Great value for money."
    }
  ]
}

Example response in Hindi:
{
  "recommendations": [
    {
      "productId": 4,
      "reason": "16GB RAM और Snapdragon 8 Gen 3 प्रोसेसर के साथ बेहतरीन कीमत-से-मूल्य अनुपात। बजट पर प्रदर्शन प्रेमियों के लिए बढ़िया। 5400 mAh बैटरी पूरे दिन उपयोग सुनिश्चित करती है।"
    }
  ]
}

Return ONLY the JSON object, no additional text or explanation.`;

  try {
    // Call Gemini API using the official SDK - following the exact structure provided
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    });

    // Extract the response text from Gemini API
    const responseText = response.candidates[0].content.parts[0].text || '{}';

    // Parse the JSON response
    // Sometimes the response might have markdown code blocks, so we clean it
    let cleanedText = responseText.trim();
    
    // Remove markdown code blocks if present
    cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    cleanedText = cleanedText.trim();

    // Try to extract JSON object from the response
    let jsonString = cleanedText;
    
    // If response doesn't start with {, try to find JSON object
    if (!cleanedText.startsWith('{')) {
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonString = jsonMatch[0];
      }
    }

    // Parse the JSON object
    const responseData = JSON.parse(jsonString);

    // Validate response structure
    if (!responseData.recommendations || !Array.isArray(responseData.recommendations)) {
      throw new Error('Invalid response format: expected recommendations array');
    }

    // Filter and validate recommendations
    const validRecommendations = responseData.recommendations
      .filter((rec) => {
        const isValidId = typeof rec.productId === 'number' && 
                         products.some((p) => p.id === rec.productId);
        const hasReason = rec.reason && typeof rec.reason === 'string';
        return isValidId && hasReason;
      })
      .slice(0, 5); // Limit to top 5 recommendations

    // Return object with product IDs and reasons map
    const productIds = validRecommendations.map(rec => rec.productId);
    const reasonsMap = {};
    validRecommendations.forEach(rec => {
      reasonsMap[rec.productId] = rec.reason;
    });

    return {
      productIds,
      reasons: reasonsMap
    };
  } catch (error) {
    // Handle API errors
    console.error("API request failed:", error);
    
    if (error.message) {
      throw new Error(`API request failed: ${error.message}`);
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse AI response. Please try again.');
    }

    // Re-throw other errors
    throw error;
  }
};

