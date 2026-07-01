import React from 'react';
import { Award, Star, Compass, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const Trust = () => {
  const trustItems = [
    {
      icon: <Star className="w-8 h-8 text-theme-accent" />,
      title: "4.9/5.0 Google Rating",
      description: "Highest rated gourmet establishment in New Delhi, reviewed by 1,280+ verified gourmands."
    },
    {
      icon: <Award className="w-8 h-8 text-theme-accent" />,
      title: "Michelin Selected",
      description: "Featured in the prestigious global culinary guide as a destination of culinary excellence."
    },
    {
      icon: <Compass className="w-8 h-8 text-theme-accent" />,
      title: "12 Years Experience",
      description: "Perfecting techniques, sourcing unique regional ingredients, and curating unforgettable dining nights."
    }
  ];

  return (
    <section className="py-20 bg-theme-bg relative overflow-hidden">
      {/* Subtle ambient light gradient */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-theme-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-theme-accent font-semibold">Our Accolades</p>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-theme-text">A Legacy of Exquisite Craft</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="p-8 rounded-3xl bg-theme-card-bg border border-theme-card-border/40 backdrop-blur-xl hover:border-theme-accent/40 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center space-y-4 shadow-xl"
            >
              <div className="p-4 bg-theme-accent/5 rounded-2xl border border-theme-accent/15">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold font-heading text-theme-text">{item.title}</h3>
              <p className="text-sm text-theme-text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
