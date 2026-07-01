import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin globally
gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Tell GSAP ScrollTrigger to listen to Lenis scroll events
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Synchronize GSAP ticker frame updates with Lenis
    const updateGsap = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateGsap);
    
    // Disable lag smoothing for instant ScrollTrigger response
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateGsap);
    };
  }, []);

  return children;
};

export default SmoothScroll;
