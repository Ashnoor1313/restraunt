import React, { useEffect } from 'react';

const PrivacyPage = () => {
  useEffect(() => {
    document.title = "Privacy Policy | L'Ambroisie";
  }, []);

  return (
    <div className="pt-32 pb-24 bg-theme-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-8 text-theme-text-muted leading-relaxed font-light text-sm">
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-theme-text">Privacy Policy</h1>
        <p className="text-xs">Last updated: June 28, 2026</p>

        <section className="space-y-4">
          <h3 className="text-lg font-bold font-heading text-theme-text">1. Information Collection</h3>
          <p>
            When making a table reservation, booking an event, or joining our VIP Club, we collect name, email, phone number, and preferences. This details is utilized strictly to authorize table seating and contact you with booking confirmation emails.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold font-heading text-theme-text">2. Data Security</h3>
          <p>
            All connection streams to our database are encrypted using modern TLS standards. We never sell, share, or publish your data to external advertisers.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
