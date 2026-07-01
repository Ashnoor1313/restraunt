import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Camera } from 'lucide-react';

const galleryItems = [
  { id: 1, category: 'Food', title: 'Forest Mushroom Tartlet', image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80' },
  { id: 2, category: 'Interior', title: 'Luxury Wine Vaults', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80' },
  { id: 3, category: 'Kitchen', title: 'Culinary Plating Details', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80' },
  { id: 4, category: 'Interior', title: 'Elegant Main Dining Hall', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80' },
  { id: 5, category: 'Events', title: 'Intimate Candlelit Dinner', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80' }
];

const GalleryPage = () => {
  const [filter, setFilter] = useState('All');
  const [filteredItems, setFilteredItems] = useState(galleryItems);

  useEffect(() => {
    document.title = "Visual Photo Gallery & Interiors | L'Ambroisie";
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === filter));
    }
  }, [filter]);

  const categories = ['All', 'Food', 'Interior', 'Kitchen', 'Events'];

  return (
    <div className="pt-32 pb-24 bg-theme-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-theme-accent font-semibold flex items-center justify-center gap-2">
            <Camera className="w-4 h-4 text-theme-accent" /> Visual Splendour
          </p>
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-theme-text">The Gallery</h1>
          <p className="text-sm text-theme-text-muted leading-relaxed font-light">
            Take a visual tour through our architectural dining spaces, clean steel kitchens, and plated recipes.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? 'bg-theme-accent text-theme-bg'
                  : 'bg-theme-card-bg border border-theme-card-border/40 text-theme-text hover:bg-theme-accent/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group rounded-3xl overflow-hidden aspect-[4/3] relative border border-theme-card-border/30 shadow-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Information Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-widest text-theme-accent font-semibold">{item.category}</span>
                  <h4 className="text-lg font-bold font-heading text-white mt-1">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default GalleryPage;
