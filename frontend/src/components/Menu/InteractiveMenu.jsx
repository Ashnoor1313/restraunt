import React, { useState, useEffect } from 'react';
import { Search, Flame, Sparkles, BookOpen, Coffee, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../config';

const defaultMenuItems = [
  {
    name: "Wild Forest Mushroom Tartlet",
    description: "A delicate butter pastry filled with caramelized wild chanterelles, black truffle cream, and fresh micro-herbs.",
    price: 850,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80",
    tags: ["Veg", "Chef Special"],
    ingredients: ["Chanterelles", "Truffle oil", "Puff pastry", "Mascarpone", "Micro-greens"],
    calories: 320,
    winePairing: { name: "Pinot Noir", type: "Red", description: "An earthy red that echoes the mushroom tones." },
    story: "Foraged by hand in local temperate pine woods, our chanterelle mushrooms are carefully cleaned and sautéed with butter and thyme within 6 hours of harvest."
  },
  {
    name: "Tomato Basil Bruschetta",
    description: "Toasted artisanal sourdough rubbed with garlic, topped with marinated heirloom tomatoes, fresh basil, and a drizzle of 25-year aged balsamic.",
    price: 650,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=600&q=80",
    tags: ["Veg", "Vegan"],
    ingredients: ["Sourdough", "Heirloom tomatoes", "Garlic", "Basil", "Balsamic vinegar"],
    calories: 210,
    winePairing: { name: "Pinot Grigio", type: "White", description: "A crisp white that matches the tomato acidity." },
    story: "Our heirloom tomatoes are picked at peak ripeness from our greenhouse and seasoned with hand-harvested sea salt."
  },
  {
    name: "French Onion Soup",
    description: "Slow-caramelized yellow onions simmered in a rich beef bone broth, finished with a toasted gruyère crouton.",
    price: 750,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
    tags: ["Chef Special"],
    ingredients: ["Onions", "Beef broth", "Sourdough crouton", "Gruyere cheese", "Thyme"],
    calories: 340,
    winePairing: { name: "Chablis", type: "White", description: "A mineral-forward Chardonnay to balance the sweet onions." },
    story: "It takes our chefs 8 hours of slow-stirring to caramelize the sweet onions to a perfect deep amber color before adding our 48-hour bone broth."
  },
  {
    name: "Truffle Glazed Filet Mignon",
    description: "Prime dry-aged beef tenderloin with a bone marrow crust, roasted asparagus, and dark cherry jus.",
    price: 2450,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    tags: ["Gluten Free"],
    ingredients: ["Beef tenderloin", "Asparagus", "Bone marrow", "Red wine reduction", "Morels"],
    calories: 680,
    winePairing: { name: "Cabernet Sauvignon", type: "Red", description: "Bold tannins cut through the rich marbled cut." },
    story: "Aged for 28 days in our custom Himalayan salt chamber, our grass-fed tenderloin is cooked to medium-rare over a hickory fire wood grill."
  },
  {
    name: "Saffron & Lobster Risotto",
    description: "Acquerello aged carnaroli rice, poached butter lobster tail, saffron stamens, and fresh Parmigiano-Reggiano.",
    price: 1850,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    tags: ["Gluten Free", "Chef Special"],
    ingredients: ["Carnaroli rice", "Lobster tail", "Saffron", "Parmesan", "White wine"],
    calories: 590,
    winePairing: { name: "Sauvignon Blanc", type: "White", description: "Crisp minerality balances the sweet lobster meat." },
    story: "Our rice is dry-aged for seven years to ensure maximum starch absorption, resulting in a velvety creaminess cooked with authentic Persian saffron."
  },
  {
    name: "Pan-Seared Sea Bass",
    description: "Fillet of Chilean sea bass seared to perfection, served with wilted baby spinach, saffron-infused butter sauce, and micro-herbs.",
    price: 2150,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
    tags: ["Gluten Free", "Chef Special"],
    ingredients: ["Chilean Sea Bass", "Spinach", "Saffron butter", "Lemon", "Micro-herbs"],
    calories: 450,
    winePairing: { name: "Sauvignon Blanc", type: "White", description: "Bright citrus notes that cut through the rich butter sauce." },
    story: "Line-caught in the pristine sub-Antarctic waters, our sea bass is delivered fresh daily and pan-seared to lock in moisture."
  },
  {
    name: "Golden Chocolate Sphere",
    description: "A dark Valrhona chocolate dome filled with salted caramel mousse, roasted hazelnut crunch, melted with warm dark rum fudge sauce.",
    price: 750,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
    tags: ["Veg", "Chef Special"],
    ingredients: ["Valrhona chocolate", "Salted caramel", "Hazelnut", "Rum", "24k Gold leaf"],
    calories: 450,
    winePairing: { name: "Tawny Port", type: "Dessert", description: "Notes of dried fig and hazelnut mirror the dessert." },
    story: "Crafted by hand in our pastry kitchen, the chocolate dome is spray-finished with culinary 24k gold dust, melting in front of the diner's eyes upon pouring our signature hot sauce."
  },
  {
    name: "Madagascar Vanilla Crème Brûlée",
    description: "Classic rich custard infused with organic Madagascar vanilla beans, topped with a layer of hardened caramelized sugar.",
    price: 680,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&w=600&q=80",
    tags: ["Veg", "Gluten Free"],
    ingredients: ["Heavy cream", "Egg yolks", "Sugar", "Madagascar vanilla bean"],
    calories: 380,
    winePairing: { name: "Sauternes", type: "Dessert", description: "A sweet honeyed dessert wine that mirrors the vanilla notes." },
    story: "We use only A-grade vanilla pods imported directly from Madagascar, scraped by hand to ensure the finest flavor distribution in our custard."
  },
  {
    name: "Classic Tiramisu",
    description: "Layers of espresso-soaked ladyfingers and velvety mascarpone cream, dusted with organic Valrhona cocoa powder.",
    price: 720,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
    tags: ["Veg"],
    ingredients: ["Mascarpone", "Espresso", "Ladyfingers", "Cocoa powder", "Marsala wine"],
    calories: 420,
    winePairing: { name: "Tawny Port", type: "Dessert", description: "Rich, nutty profile that elevates the espresso and cocoa tones." },
    story: "Our espresso blend is roasted specifically for our tiramisu, extracting deep chocolate notes that blend beautifully with the Italian mascarpone."
  },
  {
    name: "Smoked Rosemary Old Fashioned",
    description: "High-rye bourbon, charred rosemary syrup, angostura bitters, served under a smoke-filled glass cloche.",
    price: 650,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
    tags: ["Vegan"],
    ingredients: ["Rye Bourbon", "Rosemary", "Angostura bitters", "Orange peel", "Oak smoke"],
    calories: 140,
    winePairing: { name: "Charred Cedarwood Cigar", type: "Smoke", description: "The visual smoke aromatics complement a premium cigar." },
    story: "Served in a glass cloche smoked with toasted cherrywood chips, this cocktail releases clean cedar aromas as it is uncovered table-side."
  },
  {
    name: "Hibiscus Lavender Mocktail",
    description: "A refreshing infusion of dried organic hibiscus petals, lavender syrup, fresh lime juice, and sparkling water.",
    price: 480,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80",
    tags: ["Vegan", "Veg"],
    ingredients: ["Hibiscus", "Lavender syrup", "Lime juice", "Sparkling water", "Mint"],
    calories: 90,
    winePairing: { name: "N/A", type: "Alcohol-Free", description: "This botanical drink is self-complete." },
    story: "The hibiscus blossoms are cold-steeped for 12 hours to capture their vibrant crimson hue and tart berry profile without any bitterness."
  },
  {
    name: "Cucumber Basil Gimlet",
    description: "Premium botanical gin shaken with fresh muddled cucumber, sweet basil leaves, and lime juice.",
    price: 620,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    tags: ["Vegan", "Veg"],
    ingredients: ["Gin", "Cucumber", "Basil", "Lime juice", "Simple syrup"],
    calories: 160,
    winePairing: { name: "N/A", type: "Cocktail", description: "Best enjoyed on its own as a crisp, herbaceous aperitif." },
    story: "English cucumbers are pressed fresh every afternoon, providing a crisp, cooling element that highlights the botanicals in our house gin."
  }
];

const InteractiveMenu = () => {
  const [menuItems, setMenuItems] = useState(defaultMenuItems);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);

  // Fetch from backend API if active, otherwise fallback to seed data
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        let url = `${API_BASE_URL}/api/menu`;
        const params = [];
        if (activeCategory !== 'All') params.push(`category=${activeCategory}`);
        if (searchQuery) params.push(`search=${searchQuery}`);
        if (activeTag) params.push(`tag=${activeTag}`);
        if (params.length > 0) url += `?${params.join('&')}`;

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setMenuItems(data);
        } else {
          // Fallback filtering on client side if API is not running
          filterClientSide();
        }
      } catch (err) {
        filterClientSide();
      }
    };

    fetchMenu();
  }, [activeCategory, searchQuery, activeTag]);

  const filterClientSide = () => {
    let filtered = defaultMenuItems.filter(item => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchTag = !activeTag || item.tags.includes(activeTag);
      const matchSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchTag && matchSearch;
    });
    setMenuItems(filtered);
  };

  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];
  const tags = ['Veg', 'Vegan', 'Gluten Free', 'Spicy', 'Chef Special'];

  return (
    <div className="space-y-12">
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-theme-card-bg border border-theme-card-border/40 p-6 rounded-3xl backdrop-blur-xl">
        {/* Categories */}
        <div className="flex flex-wrap gap-2.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors duration-300 cursor-pointer z-10"
            >
              {/* Text color shift */}
              <span className={`relative z-20 transition-colors duration-300 ${activeCategory === cat ? 'text-theme-bg font-bold' : 'text-theme-text'}`}>
                {cat}
              </span>
              
              {/* Sliding background pill */}
              {activeCategory === cat && (
                <motion.span
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-theme-accent rounded-full z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              
              {/* Border for inactive category */}
              {activeCategory !== cat && (
                <span className="absolute inset-0 bg-theme-bg/40 border border-theme-card-border/40 rounded-full z-0" />
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[280px]">
          <input
            type="text"
            placeholder="Search delicacy or ingredient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-5 py-3 rounded-full bg-theme-bg/40 border border-theme-card-border/60 text-theme-text text-xs focus:outline-none focus:border-theme-accent transition-colors"
          />
          <Search className="w-4 h-4 text-theme-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Sub-Filters / Diet Tags */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
            className={`px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
              activeTag === tag
                ? 'bg-theme-text text-theme-bg border border-theme-text'
                : 'bg-transparent text-theme-text-muted hover:text-theme-text border border-theme-card-border/30'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Dishes Listings Grid */}
      <motion.div
        key={`${activeCategory}-${searchQuery}-${activeTag}`}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {menuItems.map((dish) => (
          <motion.div
            key={dish.name}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
            className="group rounded-3xl bg-theme-card-bg border border-theme-card-border/40 overflow-hidden hover:border-theme-accent/60 shadow-xl hover:shadow-2xl hover:shadow-theme-accent/5 flex flex-col justify-between relative transform-gpu"
          >
            {/* Glowing hover border accent */}
            <div className="absolute inset-0 border border-theme-accent/0 group-hover:border-theme-accent/20 rounded-3xl transition-colors duration-500 pointer-events-none z-10" />

            {/* Visual Media */}
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700 ease-out transform-gpu"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {dish.tags.includes('Chef Special') && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-theme-accent text-theme-bg text-[9px] font-bold tracking-widest uppercase flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Special
                </span>
              )}
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <h4 className="text-lg font-bold font-heading text-theme-text group-hover:text-theme-accent transition-colors duration-300">{dish.name}</h4>
                  <span className="text-base font-bold text-theme-accent font-heading group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300">₹{dish.price}</span>
                </div>
                <p className="text-xs text-theme-text-muted leading-relaxed font-light">{dish.description}</p>
              </div>

              <div className="pt-4 border-t border-theme-card-border/30 flex items-center justify-between">
                <span className="text-[10px] text-theme-text-muted italic">{dish.calories} Kcal</span>
                <button
                  onClick={() => setSelectedDish(dish)}
                  className="text-[10px] uppercase tracking-wider font-bold text-theme-accent hover:text-theme-accent-hover transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3 h-3" /> Sourcing Story
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {menuItems.length === 0 && (
        <div className="text-center py-20">
          <p className="text-theme-text-muted text-sm font-light">No gourmet items found matching your filters.</p>
        </div>
      )}

      {/* Sourcing / Ingredient Story Dialog Popover */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              className="w-full max-w-xl bg-theme-bg border border-theme-card-border p-8 rounded-3xl shadow-2xl relative space-y-6"
            >
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-5 right-5 text-theme-text-muted hover:text-theme-text p-2 rounded-full bg-theme-card-bg border border-theme-card-border/30"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-theme-accent font-semibold flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5" /> Ingredient Sourcing & Prep
                </span>
                <h3 className="text-2xl font-bold font-heading text-theme-text">{selectedDish.name}</h3>
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden border border-theme-card-border/30">
                <img src={selectedDish.image} alt={selectedDish.name} className="w-full h-full object-cover" />
              </div>

              <p className="text-xs sm:text-sm text-theme-text-muted leading-relaxed font-light">
                {selectedDish.story || "Each ingredient in this dish is sourced with organic principles, supporting local micro-farms and prepared meticulously in our kitchens."}
              </p>

              <div className="grid grid-cols-2 gap-4 p-4 bg-theme-card-bg rounded-2xl border border-theme-card-border/30 text-xs text-theme-text-muted">
                <div>
                  <span className="font-bold text-theme-text block mb-1">Key Components</span>
                  {selectedDish.ingredients.join(', ')}
                </div>
                <div>
                  <span className="font-bold text-theme-text block mb-1">Sommelier Match</span>
                  {selectedDish.winePairing?.name || 'House vintage pairing available.'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveMenu;
