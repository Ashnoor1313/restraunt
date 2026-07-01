import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Compass } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact Our Front Desk | L'Ambroisie";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-theme-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Contact info cards */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-theme-accent font-semibold flex items-center gap-2">
              <Compass className="w-4 h-4 text-theme-accent animate-spin" style={{ animationDuration: '6s' }} /> Touch Base
            </p>
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-theme-text">Contact Us</h1>
            <p className="text-sm text-theme-text-muted leading-relaxed font-light">
              For corporate event requests, wedding banquets, private chef hires, or custom menu designs.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <Phone className="w-5 h-5 text-theme-accent mt-1" />
              <div>
                <h4 className="font-bold text-sm text-theme-text uppercase tracking-wider">Phone Reservation</h4>
                <p className="text-xs text-theme-text-muted mt-1">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Mail className="w-5 h-5 text-theme-accent mt-1" />
              <div>
                <h4 className="font-bold text-sm text-theme-text uppercase tracking-wider">Email Inquiry</h4>
                <p className="text-xs text-theme-text-muted mt-1">concierge@lambroisie.com</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <MapPin className="w-5 h-5 text-theme-accent mt-1" />
              <div>
                <h4 className="font-bold text-sm text-theme-text uppercase tracking-wider">Main Dining Enclave</h4>
                <p className="text-xs text-theme-text-muted mt-1">84 Luxury Avenue, Chanakyapuri, New Delhi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-theme-card-bg border border-theme-card-border p-8 rounded-3xl backdrop-blur-md shadow-2xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-theme-text-muted">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-theme-bg/40 border border-theme-card-border/60 text-theme-text text-sm rounded-xl focus:outline-none focus:border-theme-accent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-theme-text-muted">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-theme-bg/40 border border-theme-card-border/60 text-theme-text text-sm rounded-xl focus:outline-none focus:border-theme-accent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-theme-text-muted">Query Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-theme-bg/40 border border-theme-card-border/60 text-theme-text text-sm rounded-xl focus:outline-none focus:border-theme-accent"
                >
                  <option value="General Inquiry" className="bg-theme-bg">General Inquiry</option>
                  <option value="Event Planning" className="bg-theme-bg">Private Event / Banquet Booking</option>
                  <option value="Press / Careers" className="bg-theme-bg">Media & Collaboration</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-theme-text-muted">Detailed Message</label>
                <textarea
                  required
                  placeholder="How can our concierge assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 h-32 bg-theme-bg/40 border border-theme-card-border/60 text-theme-text text-sm rounded-xl focus:outline-none focus:border-theme-accent resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer shadow-lg"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4">
              <CheckCircle className="w-12 h-12 text-theme-accent mx-auto animate-pulse" />
              <h3 className="font-heading font-bold text-xl text-theme-text">Message Sent Successfully</h3>
              <p className="text-xs text-theme-text-muted max-w-sm mx-auto leading-relaxed font-light">
                Our Front Desk concierge team will evaluate your message and reply via email within 12 hours.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
