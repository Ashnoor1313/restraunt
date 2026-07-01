import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Menu, ChevronDown } from 'lucide-react';
import Magnetic from '../UI/Magnetic';

// Character-by-character luxury text reveal component
const CharacterReveal = ({ text, delay = 0 }) => {
  const letters = Array.from(text);
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      }
    }
  };

  const letterVariants = {
    hidden: { 
      y: "110%", 
      opacity: 0,
      rotateX: 45
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { 
        duration: 1.0, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <motion.span 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="inline-block perspective-[800px]"
    >
      {letters.map((char, idx) => (
        <motion.span
          key={idx}
          variants={letterVariants}
          className="inline-block origin-bottom transform-gpu"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  
  // Parallax on scroll transforms
  const bgScale = useTransform(scrollY, [0, 800], [1.05, 1.2]);
  const bgOpacity = useTransform(scrollY, [0, 800], [0.65, 0.2]);
  const contentY = useTransform(scrollY, [0, 800], [0, 140]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Mouse Parallax coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background Video / Image with Dual Parallax (Scroll & Mouse) */}
      <div className="absolute inset-0 w-full h-full transform-gpu">
        <motion.div
          style={{ 
            scale: bgScale, 
            opacity: bgOpacity,
            x: mousePos.x * -18,
            y: mousePos.y * -18
          }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
          className="w-full h-full origin-center"
        >
          {/* Slow zoom animation in background */}
          <motion.img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
            alt="Cinematic Fine Dining Room"
            className="w-full h-full object-cover filter brightness-[0.7] transition-all duration-300"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
        
        {/* Soft atmospheric gradient & bloom overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/20 to-black/60" />
        
        {/* Warm radial light bloom behind center content */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />
      </div>

      {/* Content Container with Mouse Tracking Parallax */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        animate={{
          x: mousePos.x * 12,
          y: mousePos.y * 12
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8 transform-gpu"
      >
        {/* Subtitle - Fade up with delay */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-xs md:text-sm tracking-[0.45em] uppercase text-theme-accent font-semibold"
        >
          L'Ambroisie Parisian Bistro & Dining
        </motion.p>

        {/* Headline - Character-by-character reveal */}
        <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white font-heading leading-none">
          <span className="block overflow-hidden pb-1 sm:pb-3">
            <CharacterReveal text="An Unforgettable" delay={0.4} />
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span
              initial={{ opacity: 0, y: "100%", skewY: 4 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="inline-block italic font-normal text-theme-accent"
            >
              Dining Journey
            </motion.span>
          </span>
        </h1>

        {/* Paragraph description - Fade up with delay */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
          className="text-sm md:text-lg text-gray-300 font-light max-w-xl mx-auto leading-relaxed"
        >
          Crafting memories through organic farm-to-table culinary masterpieces, rare vintages, and high-art aesthetic environments.
        </motion.p>

        {/* CTA Buttons - Scale and Fade Up */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Magnetic>
            <Link
              to="/reservation"
              className="w-full sm:w-auto px-8 py-4 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-semibold rounded-full flex items-center justify-center gap-2.5 shadow-2xl transition-all duration-300 uppercase tracking-widest text-xs hover:scale-103"
            >
              <Calendar className="w-4 h-4" /> Book Chef Table
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              to="/menu"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full flex items-center justify-center gap-2.5 backdrop-blur-md border border-white/20 transition-all duration-300 uppercase tracking-widest text-xs hover:scale-103"
            >
              <Menu className="w-4 h-4" /> View Menu
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Continuously Animated Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium">
          Scroll to explore
        </span>
        <motion.div
          animate={{ 
            y: [0, 9, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ 
            duration: 1.8, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        >
          <ChevronDown className="w-5 h-5 text-theme-accent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
