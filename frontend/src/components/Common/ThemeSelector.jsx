import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Palette, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const themesList = [
  { id: 'luxury', name: 'Luxury Gold', primary: '#D4AF37', bg: '#0D0D0D' },
  { id: 'italian', name: 'Italian Olive', primary: '#556B2F', bg: '#FCFBF7' },
  { id: 'japanese', name: 'Japanese Crimson', primary: '#BC002D', bg: '#FAF9F6' },
  { id: 'cafe', name: 'Warm Cafe', primary: '#5D4037', bg: '#FAF6EE' },
  { id: 'seafood', name: 'Ocean Navy', primary: '#0E7490', bg: '#FAFDFE' }
];

const ThemeSelector = () => {
  const { theme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-theme-accent text-theme-bg rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:bg-theme-accent-hover transition-colors"
        aria-label="Theme Panel"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Palette className="w-5 h-5" />}
      </motion.button>

      {/* Slide-out Theme Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-16 right-0 p-5 rounded-2xl bg-theme-bg border border-theme-card-border/80 shadow-2xl w-64 backdrop-blur-xl"
          >
            <h4 className="text-xs uppercase font-bold tracking-widest text-theme-text mb-4">
              Select Branding Theme
            </h4>
            <div className="flex flex-col gap-3">
              {themesList.map((t) => {
                const isActive = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => changeTheme(t.id)}
                    className={`w-full flex items-center gap-3.5 p-2.5 rounded-xl border text-left transition-all duration-300 ${
                      isActive
                        ? 'border-theme-accent bg-theme-accent/10'
                        : 'border-theme-card-border/35 hover:bg-theme-accent/5'
                    }`}
                  >
                    {/* Visual Color Dots */}
                    <div className="flex items-center">
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 inline-block -mr-1.5 z-10"
                        style={{ backgroundColor: t.primary }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 inline-block"
                        style={{ backgroundColor: t.bg }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-theme-text">{t.name}</p>
                      <p className="text-[10px] text-theme-text-muted capitalize">
                        {t.id} Concept
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
