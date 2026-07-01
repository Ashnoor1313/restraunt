import React, { useEffect } from 'react';
import { ChefHat, Quote, Leaf, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  useEffect(() => {
    document.title = "Our Culinary Story & Philosophy | L'Ambroisie";
  }, []);

  const milestones = [
    { year: '2014', title: 'The Genesis', desc: 'L\'Ambroisie begins as a private dining kitchen in Paris, catering to exclusive guests.' },
    { year: '2018', title: 'The Expansion', desc: 'Opening of our first boutique dining venue in Milan, winning critical culinary recognition.' },
    { year: '2023', title: 'Global Footprint', desc: 'Bringing our curated, high-art dining templates and kitchen philosophies to Chanakyapuri, New Delhi.' }
  ];

  return (
    <div className="pt-32 pb-24 bg-theme-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-theme-accent font-semibold flex items-center justify-center gap-2">
            <Compass className="w-4 h-4 text-theme-accent" /> Brand Heritage
          </p>
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-theme-text">Our Philosophy</h1>
          <p className="text-sm text-theme-text-muted leading-relaxed font-light">
            Crafting memorable physical and digital stories, rooted in deep respect for soil, sea, and seasonal elements.
          </p>
        </div>

        {/* Narrative Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border border-theme-card-border/30">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
              alt="Plated dish details"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-heading text-theme-text">Pure Sourcing, Zero Compromise</h3>
            <p className="text-sm text-theme-text-muted leading-relaxed font-light">
              We maintain direct, fair-trade relationships with regional farmers and seafood divers, ensuring our kitchen works exclusively with raw components harvested at peak nutrient levels.
            </p>
            <div className="flex gap-4 p-5 bg-theme-card-bg border border-theme-card-border/30 rounded-2xl">
              <Leaf className="w-8 h-8 text-theme-accent shrink-0" />
              <div>
                <h4 className="font-heading font-bold text-sm text-theme-text uppercase tracking-wider">100% Organic Greenhouse</h4>
                <p className="text-xs text-theme-text-muted mt-1 leading-relaxed">
                  All herbs and garnishes are snipped table-side from live planters, bringing fresh oxygen and soil aromatics straight to the plate.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Milestones */}
        <div className="space-y-12">
          <h3 className="text-2xl font-bold font-heading text-center text-theme-text">Our Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-theme-card-bg border border-theme-card-border/40 backdrop-blur-xl relative space-y-4">
                <span className="text-4xl font-heading font-bold text-theme-accent/30 absolute right-6 top-6">{m.year}</span>
                <h4 className="text-lg font-bold font-heading text-theme-text pt-4">{m.title}</h4>
                <p className="text-xs text-theme-text-muted leading-relaxed font-light">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
