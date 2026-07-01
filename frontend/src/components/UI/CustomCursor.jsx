import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Dynamic hover listeners for links and buttons
    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        'a, button, select, input[type="submit"], [role="button"], .custom-cursor-hoverable'
      );
      targets.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    addHoverListeners();

    // Check again when DOM updates
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [visible, cursorX, cursorY]);

  if (window.matchMedia('(pointer: coarse)').matches || !visible) return null;

  return (
    <motion.div
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-theme-accent pointer-events-none z-[9999] flex items-center justify-center"
      animate={{
        scale: hovered ? 1.8 : 1,
        backgroundColor: hovered ? 'rgba(212, 175, 55, 0.15)' : 'rgba(212, 175, 55, 0)',
        borderColor: hovered ? 'rgba(212, 175, 55, 0.8)' : 'rgba(212, 175, 55, 0.4)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-theme-accent"
        animate={{
          scale: hovered ? 0.5 : 1,
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;
