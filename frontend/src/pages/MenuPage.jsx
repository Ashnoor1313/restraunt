import React, { useEffect } from 'react';
import InteractiveMenu from '../components/Menu/InteractiveMenu';
import AIRecommendation from '../components/Menu/AIRecommendation';
import { ChefHat } from 'lucide-react';

const MenuPage = () => {
  useEffect(() => {
    document.title = "Explore Our Gourmet Gastronomy Menu | L'Ambroisie";
  }, []);

  return (
    <div className="pt-32 pb-24 bg-theme-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-theme-accent font-semibold flex items-center justify-center gap-2">
            <ChefHat className="w-4 h-4 text-theme-accent" /> Culinary Creations
          </p>
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-theme-text">The Gastronomy Menu</h1>
          <p className="text-sm text-theme-text-muted leading-relaxed font-light">
            Each recipe represents a careful balance of organic hand-harvested ingredients and architectural plating, designed to trigger sensory nostalgia.
          </p>
        </div>

        {/* AI Recommendation Sommelier Module */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-theme-accent mb-2">Unsure what to choose?</h3>
            <p className="text-xs text-theme-text-muted max-w-xs mx-auto font-light leading-relaxed">
              Consult our simulated AI Sommelier helper for curated dish and vintage pairings.
            </p>
          </div>
          <AIRecommendation />
        </div>

        {/* Searchable Categorized Menu Directory */}
        <div className="pt-8">
          <InteractiveMenu />
        </div>

      </div>
    </div>
  );
};

export default MenuPage;
