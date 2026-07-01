import React from 'react';
import { Phone, MapPin, Navigation, Compass, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const LocationHours = () => {
  return (
    <section className="py-24 bg-theme-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Contact Details & Hours */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-theme-accent font-semibold">Location & Timings</p>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-theme-text">Find Your Table</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-theme-accent mb-2">Operating Hours</h4>
              <p className="text-sm text-theme-text font-medium">Lunch Service</p>
              <p className="text-xs text-theme-text-muted mb-3">Friday - Sunday: 12:00 - 15:30</p>
              <p className="text-sm text-theme-text font-medium">Dinner Service</p>
              <p className="text-xs text-theme-text-muted">Monday - Sunday: 18:30 - 23:30</p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-theme-accent mb-2">Dining Guidelines</h4>
              <ul className="text-xs text-theme-text-muted space-y-2">
                <li>• Dress Code: Smart Casual / Elegant (no athletic wear)</li>
                <li>• Valet Parking: Complimentary valet available at entrance</li>
                <li>• Child Policy: Guests aged 10 and above are welcome</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="tel:+919876543210"
                className="px-6 py-3 border border-theme-accent hover:bg-theme-accent/5 text-theme-accent rounded-full text-xs font-semibold uppercase tracking-widest flex items-center gap-2 transition-colors duration-300"
              >
                <Phone className="w-4 h-4" /> Call Front Desk
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg rounded-full text-xs font-semibold uppercase tracking-widest flex items-center gap-2 transition-colors duration-300"
              >
                <Navigation className="w-4 h-4" /> Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Map Showcase (Premium Dark-Themed Simulation) */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-[16/10] rounded-3xl overflow-hidden border border-theme-card-border/40 shadow-2xl relative"
          >
            {/* Visual simulation of luxury map with dark overlay */}
            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              <div className="text-center space-y-4 px-6 z-10">
                <MapPin className="w-10 h-10 text-theme-accent mx-auto animate-bounce" />
                <h3 className="text-lg font-bold font-heading text-white">L'Ambroisie Parisian Bistro</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                  84 Luxury Avenue, Chanakyapuri Diplomatic Enclave, New Delhi, India
                </p>
                <span className="inline-block px-3 py-1 bg-black/60 rounded-full text-[10px] text-theme-accent border border-theme-accent/25">
                  Complimentary Valet Parking Available
                </span>
              </div>
              {/* Luxury gold grid outlines */}
              <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-theme-accent/5" />
              <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-theme-accent/5" />
              <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-theme-accent/5" />
              <div className="absolute left-0 right-0 top-1/3 h-[1px] bg-theme-accent/5" />
              <div className="absolute left-0 right-0 top-2/3 h-[1px] bg-theme-accent/5" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationHours;
