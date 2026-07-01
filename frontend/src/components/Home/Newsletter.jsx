import React, { useState } from 'react';
import { Mail, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-24 bg-theme-bg relative overflow-hidden">
      {/* Dynamic ambient accent light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-theme-accent/5 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
        <p className="text-xs uppercase tracking-[0.4em] text-theme-accent font-semibold">The Inner Circle</p>
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-theme-text max-w-2xl mx-auto leading-tight">
          Subscribe to Receive Exclusive Gastronomic Invitations
        </h2>
        <p className="text-sm md:text-base text-theme-text-muted max-w-md mx-auto font-light leading-relaxed">
          Be the first to learn about seasonal black truffle tasting menus, private live performances, and sommelier masterclass sessions.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-5 py-4 rounded-full bg-theme-card-bg border border-theme-card-border text-theme-text focus:outline-none focus:border-theme-accent text-sm"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-semibold text-xs uppercase tracking-widest rounded-full transition-colors duration-300 shadow-lg"
          >
            Join VIP Club
          </button>
        </form>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 text-theme-accent text-sm font-medium"
          >
            <ShieldCheck className="w-4 h-4" /> You're on the list. Keep an eye on your inbox.
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
