import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Sparkles, RefreshCw, CheckCircle, HelpCircle, Wine } from 'lucide-react';

const questions = [
  {
    id: 'mood',
    title: "What are you in the mood for?",
    options: [
      { label: "Light & Delicate", value: "light" },
      { label: "Rich & Savory", value: "savory" },
      { label: "Sweet & Decadent", value: "sweet" }
    ]
  },
  {
    id: 'diet',
    title: "Any dietary restrictions?",
    options: [
      { label: "No Restrictions", value: "none" },
      { label: "Vegetarian", value: "Veg" },
      { label: "Vegan", value: "Vegan" },
      { label: "Gluten Free", value: "Gluten Free" }
    ]
  },
  {
    id: 'spice',
    title: "Do you appreciate a touch of spice?",
    options: [
      { label: "Keep it Mild", value: "mild" },
      { label: "Bring on the Heat", value: "Spicy" }
    ]
  }
];

const mockDishes = [
  {
    name: "Wild Forest Mushroom Tartlet",
    description: "A delicate butter pastry filled with caramelized wild chanterelles, black truffle cream, and fresh micro-herbs.",
    tags: ["Veg", "Chef Special"],
    wine: "Pinot Noir (Red Wine)",
    ingredients: "Chanterelles, Truffle, Mascarpone",
    mood: "light",
    spice: "mild"
  },
  {
    name: "Tomato Basil Bruschetta",
    description: "Toasted artisanal sourdough rubbed with garlic, topped with marinated heirloom tomatoes, fresh basil, and a drizzle of 25-year aged balsamic.",
    tags: ["Veg", "Vegan"],
    wine: "Pinot Grigio (White Wine)",
    ingredients: "Sourdough, Heirloom tomatoes, Garlic, Basil, Balsamic",
    mood: "light",
    spice: "mild"
  },
  {
    name: "French Onion Soup",
    description: "Slow-caramelized yellow onions simmered in a rich beef bone broth, finished with a toasted gruyère crouton.",
    tags: ["Chef Special"],
    wine: "Chablis (White Wine)",
    ingredients: "Onions, Beef broth, Crouton, Gruyere, Thyme",
    mood: "savory",
    spice: "mild"
  },
  {
    name: "Truffle Glazed Filet Mignon",
    description: "Prime dry-aged beef tenderloin with a bone marrow crust, roasted asparagus, and dark cherry jus.",
    tags: ["Gluten Free"],
    wine: "Cabernet Sauvignon (Red Wine)",
    ingredients: "Beef tenderloin, Bone marrow, Asparagus",
    mood: "savory",
    spice: "mild"
  },
  {
    name: "Saffron & Lobster Risotto",
    description: "Acquerello aged carnaroli rice, poached butter lobster tail, saffron stamens, and fresh Parmigiano-Reggiano.",
    tags: ["Gluten Free", "Chef Special"],
    wine: "Sauvignon Blanc (White Wine)",
    ingredients: "Carnaroli rice, Lobster tail, Saffron, Parmesan",
    mood: "savory",
    spice: "mild"
  },
  {
    name: "Pan-Seared Sea Bass",
    description: "Fillet of Chilean sea bass seared to perfection, served with wilted baby spinach, saffron-infused butter sauce, and micro-herbs.",
    tags: ["Gluten Free", "Chef Special"],
    wine: "Sauvignon Blanc (White Wine)",
    ingredients: "Chilean Sea Bass, Spinach, Saffron butter, Lemon",
    mood: "light",
    spice: "mild"
  },
  {
    name: "Golden Chocolate Sphere",
    description: "A dark Valrhona chocolate dome filled with salted caramel mousse, roasted hazelnut crunch, melted with warm dark rum fudge sauce.",
    tags: ["Veg", "Chef Special"],
    wine: "Tawny Port (Dessert Wine)",
    ingredients: "Valrhona chocolate, Salted caramel, Hazelnut, Rum, 24k Gold leaf",
    mood: "sweet",
    spice: "mild"
  },
  {
    name: "Madagascar Vanilla Crème Brûlée",
    description: "Classic rich custard infused with organic Madagascar vanilla beans, topped with a layer of hardened caramelized sugar.",
    tags: ["Veg", "Gluten Free"],
    wine: "Sauternes (Dessert Wine)",
    ingredients: "Vanilla bean, Egg yolks, Heavy cream, Caramelized sugar",
    mood: "sweet",
    spice: "mild"
  },
  {
    name: "Classic Tiramisu",
    description: "Layers of espresso-soaked ladyfingers and velvety mascarpone cream, dusted with organic Valrhona cocoa powder.",
    tags: ["Veg"],
    wine: "Tawny Port (Dessert Wine)",
    ingredients: "Mascarpone, Espresso, Ladyfingers, Cocoa powder",
    mood: "sweet",
    spice: "mild"
  },
  {
    name: "Smoked Rosemary Old Fashioned",
    description: "High-rye bourbon, charred rosemary syrup, angostura bitters, served under a smoke-filled glass cloche.",
    tags: ["Vegan"],
    wine: "Charred Cedarwood Cigar (Smoke Match)",
    ingredients: "Rye Bourbon, Rosemary, Angostura bitters, Orange peel",
    mood: "savory",
    spice: "mild"
  },
  {
    name: "Hibiscus Lavender Mocktail",
    description: "A refreshing infusion of dried organic hibiscus petals, lavender syrup, fresh lime juice, and sparkling water.",
    tags: ["Vegan", "Veg"],
    wine: "N/A (Botanical)",
    ingredients: "Hibiscus, Lavender, Lime, Mint",
    mood: "light",
    spice: "mild"
  },
  {
    name: "Cucumber Basil Gimlet",
    description: "Premium botanical gin shaken with fresh muddled cucumber, sweet basil leaves, and lime juice.",
    tags: ["Vegan", "Veg"],
    wine: "N/A (Gin Botanical)",
    ingredients: "Gin, Cucumber, Basil, Lime",
    mood: "light",
    spice: "mild"
  }
];

const AIRecommendation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({ mood: '', diet: '', spice: '' });
  const [result, setResult] = useState(null);

  const handleSelect = (value) => {
    const key = questions[currentStep].id;
    setAnswers(prev => ({ ...prev, [key]: value }));

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate Recommendation
      calculateRecommendation({ ...answers, [key]: value });
    }
  };

  const calculateRecommendation = (finalAnswers) => {
    // Basic filter logic
    let matches = mockDishes.filter(d => {
      // Mood matching
      if (finalAnswers.mood && d.mood !== finalAnswers.mood) return false;
      // Diet matching
      if (finalAnswers.diet && finalAnswers.diet !== 'none' && !d.tags.includes(finalAnswers.diet)) return false;
      // Spice matching
      if (finalAnswers.spice === 'Spicy' && !d.tags.includes('Spicy')) {
        // Fallback to general savory if no spicy matches
      }
      return true;
    });

    // Fallback if no matching dishes
    if (matches.length === 0) {
      matches = [mockDishes[0]];
    }

    // Pick first match
    setResult(matches[0]);
    setCurrentStep(3); // Result step
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({ mood: '', diet: '', spice: '' });
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-3xl bg-theme-card-bg border border-theme-card-border/60 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-theme-accent via-theme-accent-hover to-theme-accent" />

      <AnimatePresence mode="wait">
        {/* Steps 0, 1, 2: Questions */}
        {currentStep < 3 && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2.5 text-theme-accent">
              <ChefHat className="w-5 h-5" />
              <span className="text-xs uppercase font-bold tracking-[0.28em]">
                AI Culinary Sommelier
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-heading text-theme-text">
              {questions[currentStep].title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {questions[currentStep].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className="px-6 py-4 text-sm font-semibold rounded-2xl border border-theme-card-border/40 bg-theme-bg/40 text-theme-text hover:border-theme-accent hover:bg-theme-accent/5 text-left transition-all duration-300 flex justify-between items-center group cursor-pointer"
                >
                  {opt.label}
                  <CheckCircle className="w-4 h-4 text-theme-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>

            {/* Steps indicator */}
            <div className="flex justify-between items-center pt-6 text-[10px] text-theme-text-muted border-t border-theme-card-border/20">
              <span>Question {currentStep + 1} of 3</span>
              <div className="flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className={`w-4 h-1.5 rounded-full transition-all duration-300 ${
                      i === currentStep ? 'bg-theme-accent w-6' : 'bg-theme-card-border/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Result */}
        {currentStep === 3 && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-theme-accent">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="text-xs uppercase font-bold tracking-[0.28em]">
                  Recommended For You
                </span>
              </div>
              <button
                onClick={handleReset}
                className="p-2 text-theme-text-muted hover:text-theme-accent transition-colors"
                title="Restart Sommelier"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold font-heading text-theme-text">{result.name}</h3>
              <p className="text-sm text-theme-text-muted leading-relaxed font-light">
                {result.description}
              </p>
            </div>

            {/* Ingredients & Wine Pairing Box */}
            <div className="p-5 rounded-2xl bg-theme-bg/60 border border-theme-card-border/30 space-y-3">
              <div className="text-xs text-theme-text-muted">
                <span className="font-bold text-theme-text block uppercase tracking-wider mb-1">
                  Primary Components
                </span>
                {result.ingredients}
              </div>
              <div className="flex gap-3 items-start text-xs border-t border-theme-card-border/20 pt-3">
                <Wine className="w-5 h-5 text-theme-accent shrink-0" />
                <div>
                  <span className="font-bold text-theme-text block uppercase tracking-wider mb-0.5">
                    Sommelier Wine Match
                  </span>
                  <span className="text-theme-text-muted">{result.wine}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 border border-theme-card-border hover:border-theme-accent text-theme-text font-semibold rounded-xl text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-evaluate mood
              </button>
              <Link
                to="/reservation"
                className="w-full sm:w-auto px-8 py-3 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-bold rounded-xl text-xs uppercase tracking-widest transition-colors flex-grow shadow-lg text-center flex items-center justify-center cursor-pointer"
              >
                Order Recommendation Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIRecommendation;
