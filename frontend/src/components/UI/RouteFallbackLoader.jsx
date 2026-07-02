import React from 'react';

const RouteFallbackLoader = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#0D0D0D]/60 backdrop-blur-md z-[8888] flex flex-col items-center justify-center text-white transition-opacity duration-300">
      <div className="text-center relative z-10 space-y-4">
        {/* Sleek Golden Circular Spinner */}
        <div className="relative w-12 h-12 mx-auto">
          <div className="absolute inset-0 rounded-full border-2 border-gray-800" />
          <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
        </div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-light animate-pulse">
          Loading Salon...
        </p>
      </div>
    </div>
  );
};

export default RouteFallbackLoader;
