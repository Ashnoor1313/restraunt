import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-theme-bg border-t border-theme-card-border/50 text-theme-text/80 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand & Narrative */}
        <div className="space-y-6">
          <h3 className="font-heading text-2xl font-bold tracking-widest text-theme-text">L'AMBROISIE</h3>
          <p className="text-sm text-theme-text-muted leading-relaxed max-w-xs">
            Where culinary passion meets sophisticated ambiance. An unforgettable digital and physical dining experience.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2.5 rounded-full bg-theme-card-bg border border-theme-card-border hover:text-theme-accent transition-colors duration-300" aria-label="Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="p-2.5 rounded-full bg-theme-card-bg border border-theme-card-border hover:text-theme-accent transition-colors duration-300" aria-label="Facebook">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="p-2.5 rounded-full bg-theme-card-bg border border-theme-card-border hover:text-theme-accent transition-colors duration-300" aria-label="Twitter">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-theme-text">Explore</h4>
          <ul className="space-y-3.5 text-sm">
            <li><Link to="/menu" className="hover:text-theme-accent transition-colors">Our Menu</Link></li>
            <li><Link to="/reservation" className="hover:text-theme-accent transition-colors">Book a Table</Link></li>
            <li><Link to="/gallery" className="hover:text-theme-accent transition-colors">Interior Gallery</Link></li>
            <li><Link to="/about" className="hover:text-theme-accent transition-colors">Our Philosophy</Link></li>
            <li><Link to="/events" className="hover:text-theme-accent transition-colors">Upcoming Events</Link></li>
          </ul>
        </div>

        {/* Hours & Contact */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-theme-text">Restaurant Hours</h4>
          <ul className="space-y-3 text-sm text-theme-text-muted">
            <li className="flex justify-between"><span>Mon - Thu</span> <span className="text-theme-text">17:00 - 23:00</span></li>
            <li className="flex justify-between"><span>Fri - Sat</span> <span className="text-theme-text">12:00 - 00:00</span></li>
            <li className="flex justify-between"><span>Sunday</span> <span className="text-theme-text">12:00 - 22:00</span></li>
            <li className="pt-2 flex items-center gap-2 text-theme-text">
              <Phone className="w-4 h-4 text-theme-accent" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2 text-theme-text">
              <MapPin className="w-4 h-4 text-theme-accent" /> 84 Luxury Ave, New Delhi
            </li>
          </ul>
        </div>

        {/* VIP Club Subscription */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-theme-text">Join the VIP Club</h4>
          <p className="text-sm text-theme-text-muted leading-relaxed">
            Receive early access to seasonal menus, reserve wine alerts, and private event invites.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-theme-card-bg border border-theme-card-border text-theme-text text-sm focus:outline-none focus:border-theme-accent transition-colors"
            />
            <button
              type="submit"
              className="w-full py-3 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-semibold text-sm tracking-widest uppercase rounded-xl transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
          {submitted && (
            <p className="text-sm text-theme-accent flex items-center gap-1.5 animate-pulse">
              <ShieldCheck className="w-4 h-4" /> Welcome to the Inner Circle.
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-theme-card-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-theme-text-muted">
        <p>© 2026 L'Ambroisie. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-theme-text transition-colors">Privacy Policy</Link>
          <a href="#" className="hover:text-theme-text transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
