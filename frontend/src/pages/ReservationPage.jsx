import React, { useEffect } from 'react';
import MultiStepForm from '../components/Reservation/MultiStepForm';
import { CalendarCheck } from 'lucide-react';

const ReservationPage = () => {
  useEffect(() => {
    document.title = "Lock Your Table Seating Online | L'Ambroisie";
  }, []);

  return (
    <div className="pt-32 pb-24 bg-theme-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-theme-accent font-semibold flex items-center justify-center gap-2">
            <CalendarCheck className="w-4 h-4 text-theme-accent" /> Fine Dining Bookings
          </p>
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-theme-text">Reserve a Seating</h1>
          <p className="text-sm text-theme-text-muted leading-relaxed font-light">
            Due to our high-art intimate kitchen layout, we recommend booking table positions 2-3 weeks in advance. Window slots are highly sought after.
          </p>
        </div>

        {/* Multi-Step Seating Reservation Panel */}
        <div className="pt-6">
          <MultiStepForm />
        </div>

      </div>
    </div>
  );
};

export default ReservationPage;
