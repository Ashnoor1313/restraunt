import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Wine, Compass, Leaf } from 'lucide-react';
import SplitTextReveal from '../UI/SplitTextReveal';

const mockSignatures = [
  {
    name: "Wild Forest Mushroom Tartlet",
    description: "A delicate butter pastry filled with caramelized wild chanterelles, black truffle cream, and fresh micro-herbs.",
    price: "₹850",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80",
    tags: ["Veg", "Chef Special"],
    calories: 320,
    wine: "Pinot Noir (Red)",
    ingredients: "Chanterelles, Truffle, Mascarpone"
  },
  {
    name: "Saffron & Lobster Risotto",
    description: "Acquerello aged carnaroli rice, poached butter lobster tail, saffron stamens, and fresh Parmigiano-Reggiano.",
    price: "₹1,850",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    tags: ["Gluten Free", "Chef Special"],
    calories: 590,
    wine: "Sauvignon Blanc (White)",
    ingredients: "Carnaroli rice, Lobster tail, Saffron"
  },
  {
    name: "Truffle Glazed Filet Mignon",
    description: "Prime dry-aged beef tenderloin with a bone marrow crust, roasted asparagus, and dark cherry jus.",
    price: "₹2,450",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    tags: ["Gluten Free"],
    calories: 680,
    wine: "Cabernet Sauvignon (Red)",
    ingredients: "Beef tenderloin, Bone marrow, Asparagus"
  }
];

const SignatureDishes = () => {
  return (
    <section className="py-24 bg-theme-bg relative overflow-hidden">
      {/* Encapsulated animations style */}
      <style>{`
        @keyframes steamRise {
          0% { transform: translateY(10px) scale(0.9) rotate(0deg); opacity: 0; }
          15% { opacity: 0.35; }
          50% { transform: translateY(-30px) scale(1.1) rotate(5deg); opacity: 0.2; }
          100% { transform: translateY(-70px) scale(1.3) rotate(-5deg); opacity: 0; }
        }
        @keyframes leafFloat {
          0% { transform: translateY(20px) translateX(0px) rotate(0deg); opacity: 0; }
          20% { opacity: 0.7; }
          50% { transform: translateY(-40px) translateX(12px) rotate(180deg); opacity: 0.5; }
          100% { transform: translateY(-90px) translateX(-10px) rotate(360deg); opacity: 0; }
        }
        .steam-line-1 { animation: steamRise 3.5s infinite ease-in-out; }
        .steam-line-2 { animation: steamRise 4.2s infinite ease-in-out; animation-delay: 1s; }
        .steam-line-3 { animation: steamRise 3.8s infinite ease-in-out; animation-delay: 1.8s; }
        .leaf-float-1 { animation: leafFloat 4.5s infinite ease-out; }
        .leaf-float-2 { animation: leafFloat 5.2s infinite ease-out; animation-delay: 1.2s; }
        .leaf-float-3 { animation: leafFloat 4.8s infinite ease-out; animation-delay: 2.2s; }
      `}</style>

      {/* Decorative layout background dots */}
      <div className="absolute left-10 top-20 w-48 h-48 bg-theme-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-theme-accent font-semibold">Seasonal Masterpieces</p>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-theme-text">
              <SplitTextReveal text="The Signature Selections" />
            </h2>
          </div>
          <Link
            to="/menu"
            className="group flex items-center gap-2 text-xs uppercase tracking-widest text-theme-text hover:text-theme-accent font-semibold transition-colors duration-300"
          >
            Explore Full Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockSignatures.map((dish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
              className="group rounded-3xl bg-theme-card-bg/50 border border-theme-card-border/30 backdrop-blur-md overflow-hidden hover:border-theme-accent/50 shadow-xl hover:shadow-2xl hover:shadow-theme-accent/5 flex flex-col justify-between h-full relative z-10 transform-gpu"
            >
              {/* Animating stripes background on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[linear-gradient(45deg,rgba(212,175,55,0.15)_25%,transparent_25%,transparent_50%,rgba(212,175,55,0.15)_50%,rgba(212,175,55,0.15)_75%,transparent_75%,transparent)] bg-[length:32px_32px] animate-pan-stripes pointer-events-none -z-10" />

              {/* Glowing hover border accent */}
              <div className="absolute inset-0 border border-theme-accent/0 group-hover:border-theme-accent/10 rounded-3xl transition-colors duration-500 pointer-events-none z-10" />

              {/* Padded Media Section (Image Popup Hover) */}
              <div className="p-4 pb-0 relative">
                {/* Glow behind image on hover */}
                <div className="absolute -inset-1 rounded-2xl bg-theme-accent/20 opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-500 -z-10" />
                
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-500 ease-out">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-108 group-hover:rotate-2 transition-all duration-700 ease-out transform-gpu"
                  />
                  
                  {/* Floating Steam SVG lines overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                    <svg className="w-16 h-16 text-white/20 fill-none stroke-current stroke-[1.5]" viewBox="0 0 100 100">
                      <path className="steam-line-1" d="M30,80 Q25,60 35,40 T30,10" />
                      <path className="steam-line-2" d="M50,85 Q55,65 45,45 T50,15" />
                      <path className="steam-line-3" d="M70,80 Q65,60 75,40 T70,10" />
                    </svg>
                  </div>

                  {/* Floating Herb Leaves overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <Leaf className="leaf-float-1 absolute text-emerald-500/50 w-3 h-3 left-[20%] bottom-[10%]" />
                    <Leaf className="leaf-float-2 absolute text-emerald-500/40 w-3.5 h-3.5 left-[50%] bottom-[10%]" />
                    <Leaf className="leaf-float-3 absolute text-emerald-500/60 w-2.5 h-2.5 left-[75%] bottom-[10%]" />
                  </div>

                  {/* Tag List */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {dish.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] uppercase tracking-widest font-semibold text-theme-accent border border-theme-accent/30 flex items-center gap-1">
                        <Flame className="w-2.5 h-2.5" /> {tag}
                      </span>
                    ))}
                  </div>

                  {/* Chef Recommendation Badge slide/rotate in on hover */}
                  {dish.tags.includes("Chef Special") && (
                    <div className="absolute top-4 right-4 translate-x-12 -translate-y-12 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out rotate-12 group-hover:rotate-0">
                      <span className="px-3 py-1 text-[8px] font-bold tracking-widest uppercase bg-theme-accent text-theme-bg rounded-md shadow-md">
                        Recommended
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Information Section */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-bold font-heading text-theme-text group-hover:text-theme-accent transition-colors duration-300">{dish.name}</h3>
                    <span className="text-base font-bold text-theme-accent font-heading group-hover:scale-105 transition-transform duration-300">{dish.price}</span>
                  </div>
                  <p className="text-xs text-theme-text-muted leading-relaxed font-light">{dish.description}</p>
                </div>

                {/* Sommelier & Ingredients Box */}
                <div className="pt-4 border-t border-theme-card-border/30 space-y-2 text-xs transform translate-y-1.5 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2 text-theme-text-muted">
                    <Compass className="w-3.5 h-3.5 text-theme-accent shrink-0" />
                    <span>Ingredients: <strong className="text-theme-text font-normal">{dish.ingredients}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-theme-text-muted">
                    <Wine className="w-3.5 h-3.5 text-theme-accent shrink-0" />
                    <span>Sommelier Pairing: <strong className="text-theme-text font-normal">{dish.wine}</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureDishes;
