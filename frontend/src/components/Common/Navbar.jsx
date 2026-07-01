import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Utensils } from 'lucide-react';
import Magnetic from '../UI/Magnetic';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Reservation', path: '/reservation' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 glass-nav ${
        scrolled
          ? 'py-3.5 bg-theme-bg/75 border-b border-theme-card-border/60 shadow-lg shadow-black/10'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo with scroll-scaling */}
        <Link 
          to="/" 
          className={`flex items-center gap-2 group transition-transform duration-500 transform-gpu ${
            scrolled ? 'scale-92' : 'scale-100'
          }`}
        >
          <Utensils className="w-6 h-6 text-theme-accent transition-transform duration-500 group-hover:rotate-12" />
          <span className="font-heading text-2xl font-bold tracking-widest text-theme-text group-hover:text-theme-accent transition-colors duration-300">
            L'AMBROISIE
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-sm tracking-wider uppercase font-medium text-theme-text/80 hover:text-theme-accent transition-colors duration-300 group py-1"
              >
                {link.name}
                {/* Hover sliding line */}
                {!isActive && (
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-theme-accent transition-all duration-300 group-hover:w-full opacity-60" />
                )}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-theme-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Magnetic>
            <Link
              to="/reservation"
              className="group relative px-6 py-2.5 overflow-hidden rounded-full border border-theme-accent font-medium text-sm tracking-widest uppercase text-theme-text hover:text-theme-bg transition-colors duration-500"
            >
              <span className="absolute inset-0 w-full h-full bg-theme-accent transition-transform duration-500 ease-out origin-left -translate-x-full group-hover:translate-x-0" />
              <span className="relative z-10 flex items-center gap-2">
                Reserve Table <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </Magnetic>
        </div>

        {/* Hamburger Menu Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-theme-text hover:text-theme-accent transition-colors p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="lg:hidden w-full bg-theme-bg/95 backdrop-blur-2xl border-b border-theme-card-border overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`text-lg tracking-widest uppercase font-medium block py-1 ${
                        isActive ? 'text-theme-accent' : 'text-theme-text/80'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4 border-t border-theme-card-border"
              >
                <Link
                  to="/reservation"
                  className="w-full text-center py-3 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  Reserve Table <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
