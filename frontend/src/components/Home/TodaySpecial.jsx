import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Timer, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import Magnetic from '../UI/Magnetic';
import SplitTextReveal from '../UI/SplitTextReveal';

const TodaySpecial = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 34, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown for demo purposes
          return { hours: 5, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (num) => String(num).padStart(2, '0');

  return (
    <section className="py-24 bg-theme-bg/60 relative overflow-hidden border-t border-b border-theme-card-border/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Special Dish Highlight Card */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-2xl border border-theme-card-border/40 aspect-square relative group"
          >
            <img
              src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80"
              alt="Risotto Milanese special dish"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3.5 py-1 rounded-full bg-theme-accent text-theme-bg text-[10px] uppercase tracking-widest font-semibold inline-block mb-3">
                Today's Featured Saffron Dish
              </span>
              <h3 className="text-2xl font-bold font-heading text-white">Saffron Lobster Risotto</h3>
              <p className="text-xs text-gray-300 font-light mt-1.5 leading-relaxed">
                Made with 7-year dry-aged Acquerello carnaroli rice. Available in limited portions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Story, Chef Notes & Countdown */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-theme-accent font-semibold flex items-center gap-2">
              <Timer className="w-4 h-4 text-theme-accent animate-pulse" /> Limited Dinner Portions Left
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-theme-text">
              <SplitTextReveal text="Risotto Milanese con Aragosta" />
            </h2>
          </div>

          {/* Countdown Clock */}
          <div className="flex gap-4">
            {[{ label: 'Hours', val: timeLeft.hours }, { label: 'Min', val: timeLeft.minutes }, { label: 'Sec', val: timeLeft.seconds }].map((t, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-theme-card-bg border border-theme-card-border/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl sm:text-3xl font-heading font-bold text-theme-accent">
                  {formatNum(t.val)}
                </div>
                <span className="text-[10px] uppercase tracking-wider text-theme-text-muted mt-2">{t.label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-sm md:text-base text-theme-text-muted font-light leading-relaxed">
            <div className="flex gap-4 p-5 rounded-2xl bg-theme-card-bg border border-theme-card-border/30">
              <BookOpen className="w-8 h-8 text-theme-accent shrink-0" />
              <div>
                <h4 className="font-bold text-theme-text font-heading text-sm uppercase tracking-wider">Chef's Notes</h4>
                <p className="text-xs mt-1 text-theme-text-muted">
                  "For today's special, I poaching tender sweet lobster meat in Normandy butter and infusing the carnaroli rice with delicate strands of hand-harvested Persian saffron. It is rich, velvety, and pairs spectacularly with crisp Sauvignon Blanc."
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <Magnetic>
              <Link
                to="/reservation"
                className="px-8 py-3.5 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-semibold rounded-full text-xs uppercase tracking-widest flex items-center gap-2 transition-colors duration-300"
              >
                Reserve Table For Today <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodaySpecial;
