import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import Magnetic from '../UI/Magnetic';
import SplitTextReveal from '../UI/SplitTextReveal';

const Story = () => {
  return (
    <section className="py-24 bg-theme-bg relative overflow-hidden">
      {/* Decorative Background Accent */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-theme-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Visual Showcase (Images) */}
        <div className="relative">
          {/* Main Large Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[4/3] lg:aspect-[4/5] shadow-2xl relative"
          >
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
              alt="Chef plating food carefully"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          {/* Overlapping Small Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -bottom-8 -right-4 md:-right-8 p-6 rounded-2xl bg-theme-card-bg border border-theme-card-border backdrop-blur-md max-w-[220px] shadow-2xl space-y-2 hidden sm:block"
          >
            <Flame className="w-8 h-8 text-theme-accent" />
            <p className="text-sm font-bold text-theme-text uppercase tracking-widest font-heading">
              Curated by Experts
            </p>
            <p className="text-xs text-theme-text-muted">
              Executive Chef Marco Vancini brings over two decades of fine dining leadership in Milan and Paris.
            </p>
          </motion.div>
        </div>

        {/* Narrative & Philosophy */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-theme-accent font-semibold">
              Our Culinary Odyssey
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-theme-text leading-tight">
              <SplitTextReveal text="A Symphony of Flavor, Born from Earth and Fire" />
            </h2>
          </div>

          <p className="text-sm md:text-base text-theme-text-muted leading-relaxed font-light">
            Founded on the conviction that dining is a form of fine art, L'Ambroisie bridges the gap between natural farm-sourcing and sophisticated culinary plating. Our philosophy prioritizes pristine seasonal ingredients, absolute technical cooking precision, and emotional design.
          </p>

          <blockquote className="border-l-2 border-theme-accent pl-5 italic text-sm md:text-base text-theme-text/90 font-heading">
            "We do not feed our guests; we choreograph a series of culinary emotions that awaken memories and create timeless stories."
            <span className="block mt-2 text-xs font-bold uppercase tracking-widest not-italic text-theme-accent">— Chef Marco Vancini</span>
          </blockquote>

          <div className="pt-4 flex flex-wrap gap-4">
            <Magnetic>
              <Link
                to="/about"
                className="px-8 py-3.5 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-semibold rounded-full text-xs uppercase tracking-widest flex items-center gap-2 transition-colors duration-300"
              >
                Learn Our Philosophy <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
