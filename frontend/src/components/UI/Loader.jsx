import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loader after 2.4 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-full bg-[#0D0D0D] z-[9999] flex flex-col items-center justify-center text-white"
        >
          {/* Subtle geometric gold grids */}
          <div className="absolute inset-0 bg-[radial-gradient(#d4af3708_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

          <div className="text-center relative z-10 space-y-4">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl font-bold font-heading tracking-[0.2em] text-[#D4AF37]"
              >
                L'AMBROISIE
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-light"
              >
                Parisian Culinary Artistry
              </motion.p>
            </div>
            
            {/* Elegant thin loading progress line */}
            <div className="w-40 h-[1px] bg-gray-800 mx-auto mt-6 relative overflow-hidden">
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="absolute top-0 bottom-0 w-2/3 bg-[#D4AF37]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
