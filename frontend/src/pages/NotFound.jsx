import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found | L'Ambroisie";
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af3705_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      <div className="relative z-10 text-center space-y-6 max-w-md mx-auto">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="inline-block p-4 bg-theme-accent/5 rounded-full border border-theme-accent/20 mb-4"
        >
          <Compass className="w-12 h-12 text-[#D4AF37]" />
        </motion.div>
        
        <h1 className="text-6xl sm:text-8xl font-bold font-heading text-[#D4AF37]">404</h1>
        <h2 className="text-xl sm:text-2xl font-bold font-heading">Lost In Gastronomy</h2>
        <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
          The vintage selection or secret recipe page you are searching for does not exist in our menus. Allow us to lead you back to our main salon.
        </p>

        <div className="pt-6">
          <Link
            to="/"
            className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#F3C63F] text-black font-bold rounded-full text-xs uppercase tracking-widest transition-all duration-300 inline-flex items-center gap-2 shadow-2xl"
          >
            <Home className="w-4 h-4" /> Back to Main Salon
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
