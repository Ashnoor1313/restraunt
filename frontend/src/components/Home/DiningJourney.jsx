import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  {
    title: "1. The Organic Harvest",
    subtitle: "Sourcing pristine farm ingredients",
    description: "Every morning, we harvest heirloom tomatoes, wild roots, and fresh micro-greens from our private hydroponic biodynamic greenhouse in New Delhi's outskirts.",
    image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "2. The Art of Selection",
    subtitle: "Curating rare imports",
    description: "Whether it is cold-water scallops from Hokkaido or hand-plucked saffron from Kashan, we select only origin-certified raw components of extreme quality.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "3. The Sacred Kitchen",
    subtitle: "A sanctum of technical precision",
    description: "Under sterile, high-design stainless environments, our culinary team uses custom wood fire ovens and precise sous-vide tools to maintain ingredient structural integrity.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "4. Fire & Patience",
    subtitle: "Choreographing temperature",
    description: "Cooking is physics meets art. We cook our signature broths for exactly 48 hours to extract minerals and collagen, creating rich depth in every spoonful.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "5. Architectural Plating",
    subtitle: "A canvas on every dish",
    description: "Before a dish leaves the kitchen, Chef Marco details it with micro-herbs, pure gold dust, and custom reductions to ensure visual harmony.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "6. Sensorial Dining Climax",
    subtitle: "The ultimate culinary finalé",
    description: "Arriving at the table under cloches with woodsmoke, we pair each plate with aromatic descriptions, completing the journey from earth to palate.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  }
];

// Atmospheric luxury theme background colors for each step
const stepColors = [
  "#0D0D0D", // Step 1: Deep Parisian Black
  "#0E1A14", // Step 2: Dark Greenhouse Forest Green
  "#1C130E", // Step 3: Warm Copper/Clay Kitchen
  "#1F0E0E", // Step 4: Ember Flame Red Cooking
  "#1A170F", // Step 5: Gold Saffron Harvest
  "#0D0D0D"  // Step 6: Deep Elegant Dining Climax
];

const DiningJourney = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Calculate horizontal scroll distance
    const getScrollWidth = () => track.scrollWidth - window.innerWidth;
    
    let scrollWidth = getScrollWidth();

    // GSAP Timeline with ScrollTrigger pin & scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
      }
    });

    // 1. Horizontal translate of panels
    tl.to(track, {
      x: () => -scrollWidth,
      ease: "none"
    }, 0);

    // 2. Parallax effect on images: translate in opposite direction slightly
    tl.fromTo(".journey-parallax-image", 
      { xPercent: -12, scale: 1.15 },
      { 
        xPercent: 12,
        scale: 1.15,
        ease: "none"
      },
      0
    );

    // 3. Gradual background color shifts mapping through step colors
    const segmentCount = stepColors.length - 1;
    stepColors.forEach((color, idx) => {
      if (idx === 0) return;
      
      const startTime = (idx - 1) / segmentCount;
      const duration = 1 / segmentCount;
      
      tl.to(container, {
        backgroundColor: color,
        duration: duration,
        ease: "power2.inOut"
      }, startTime);
    });

    // 4. Staggered fade in/up of panel texts as they cross center screen
    const panels = gsap.utils.toArray(".journey-panel");
    panels.forEach((panel) => {
      const textBlock = panel.querySelector(".journey-text-block");
      if (textBlock) {
        gsap.fromTo(textBlock, 
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl.scrollTrigger?.animation, // sync with horizontal scroll
              start: "left 85%",
              end: "left 50%",
              scrub: true,
            }
          }
        );
      }
    });

    // Refresh ScrollTrigger on window resize to update width bounds
    const handleResize = () => {
      scrollWidth = getScrollWidth();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full overflow-hidden transition-colors duration-700 bg-[#0D0D0D]"
      style={{ willChange: 'background-color' }}
    >
      {/* Sticky Fullscreen Frame */}
      <div className="h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-8 shrink-0 relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-theme-accent font-semibold">Behind the Scenes</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mt-2">
            The Dining Journey
          </h2>
          <p className="text-xs text-theme-text-muted mt-2 font-light">
            Scroll down to view our horizontal storytelling experience.
          </p>
        </div>

        {/* Horizontal Track Slider */}
        <div ref={trackRef} className="flex h-[60vh] md:h-[65vh] items-center gap-12 px-6 md:px-12 w-max transform-gpu">
          {journeySteps.map((step, idx) => (
            <div
              key={idx}
              className="journey-panel w-[88vw] md:w-[48vw] lg:w-[35vw] shrink-0 h-full p-8 rounded-3xl bg-theme-card-bg/90 border border-theme-card-border/30 shadow-2xl flex flex-col justify-between gap-6 transform-gpu"
            >
              {/* Parallax Image Window */}
              <div className="relative w-full flex-grow rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={step.image}
                  alt={step.title}
                  className="journey-parallax-image absolute inset-0 w-full h-full object-cover origin-center transform-gpu"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>

              {/* Text Description Block */}
              <div className="journey-text-block space-y-2 transform-gpu">
                <span className="text-[10px] uppercase tracking-[0.2em] text-theme-accent font-bold">
                  {step.subtitle}
                </span>
                <h3 className="text-xl md:text-2xl font-heading font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-theme-text-muted leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DiningJourney;
