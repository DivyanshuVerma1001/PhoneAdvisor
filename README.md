# 📱 Phone AI Recommender

A modern React application that uses Google Gemini AI to recommend phones based on user preferences. Built with Vite, React, and Tailwind CSS.

## ✨ Features

-  **AI-Powered Recommendations** - Uses Gemini 1.5 Flash API to analyze user preferences
-  **Beautiful Dark Theme UI** - Modern, responsive design with smooth animations
-  **Product Cards** - Display phones with images, specs, ratings, and prices
-  **Smart Search** - Natural language input for phone preferences
-  **Fast & Responsive** - Built with Vite for optimal performance
-  **Error Handling** - Comprehensive error handling with toast notifications

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd phone-ai-recommender
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📁 Project Structure

```
phone-ai-recommender/
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx      # Individual product card component
│   │   └── SearchBar.jsx        # Search input and button component
│   ├── data/
│   │   └── products.js          # Sample phone products data
│   ├── services/
│   │   └── aiService.js         # Gemini API integration service
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles with Tailwind
├── .env.example                 # Environment variables template
├── package.json                 # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🎯 Usage

1. **Enter Your Preference:**
   - Type your phone requirements in the search box
   - Examples:
     - "phone under $500 with good camera"
     - "high performance phone with 12GB RAM"
     - "budget phone with long battery life"

2. **Get Recommendations:**
   - Click the "Get Recommendation" button
   - Wait for AI to analyze your preferences
   - View recommended phones highlighted with a purple border

3. **Browse All Products:**
   - Scroll down to see all available phones
   - Recommended phones appear at the top if available

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Toast notifications
- **Google Gemini API** - AI recommendation engine

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### API Key Setup

1. Get your free Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env` file:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Restart the dev server after adding the key

### Customizing Products

Edit `src/data/products.js` to add, remove, or modify phone products. Each product should have:
- `id` - Unique identifier
- `name` - Product name
- `brand` - Brand name
- `price` - Price in USD
- `image` - Image URL
- `specs` - Object with RAM, Storage, Battery, Processor
- `rating` - Rating out of 5

## 🎨 Customization

### Changing Theme Colors

Edit `tailwind.config.js` to customize colors. The app uses:
- Purple (`purple-*`) for primary actions
- Pink (`pink-*`) for accents
- Gray (`gray-*`) for dark theme

### Modifying Animations

Animations are defined in `tailwind.config.js` under the `extend.animation` section.

## 🐛 Troubleshooting

### API Key Issues
- Ensure your `.env` file is in the root directory
- Check that the variable name is exactly `VITE_GEMINI_API_KEY`
- Restart the dev server after changing `.env`
- Verify your API key is valid at [Google AI Studio](https://makersuite.google.com/app/apikey)

### Network Errors
- Check your internet connection
- Verify the Gemini API is accessible
- Check browser console for detailed error messages

### Build Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear Vite cache: `rm -rf node_modules/.vite`

## 📄 License

This project is open source and available for personal and educational use.


Made with ❤️ using React and AI

