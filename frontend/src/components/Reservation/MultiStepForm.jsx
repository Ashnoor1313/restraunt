import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Phone, Mail, Award, CheckCircle, ArrowRight, ArrowLeft, MessageSquare } from 'lucide-react';
import TableLayout from './TableLayout';
import { API_BASE_URL } from '../../config';

const timeSlots = [
  '12:30', '13:00', '13:30', '14:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
];

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    tableNumber: null,
    name: '',
    email: '',
    phone: '',
    occasion: 'Casual Dining',
    specialRequests: '',
    joinLoyalty: false
  });

  const [occupiedTables, setOccupiedTables] = useState([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Fetch occupied tables when date/time changes
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!formData.date || !formData.time) return;
      setLoadingAvailability(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/reservations/availability?date=${formData.date}&time=${formData.time}`);
        if (res.ok) {
          const data = await res.json();
          setOccupiedTables(data.occupiedTables);
        } else {
          setOccupiedTables([3, 5]); // mock fallbacks for client mode
        }
      } catch (err) {
        setOccupiedTables([3, 5]); // mock fallbacks for client mode
      } finally {
        setLoadingAvailability(false);
      }
    };
    fetchAvailability();
  }, [formData.date, formData.time]);

  const handleNext = () => {
    setErrorMsg('');
    if (step === 1) {
      if (!formData.date || !formData.time) {
        setErrorMsg('Please select a date and time slot.');
        return;
      }
    }
    if (step === 2) {
      if (!formData.tableNumber) {
        setErrorMsg('Please select a table to continue.');
        return;
      }
    }
    if (step === 3) {
      if (!formData.name || !formData.email || !formData.phone) {
        setErrorMsg('Please complete all contact details.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setConfirmedBooking(data.reservation);
        setStep(5); // Confirmation step
      } else {
        setErrorMsg(data.message || 'Error creating reservation.');
      }
    } catch (err) {
      // Offline mode simulation
      setConfirmedBooking({
        ...formData,
        _id: Math.random().toString(36).substr(2, 9).toUpperCase()
      });
      setStep(5);
    }
  };

  // Generate WhatsApp booking message
  const getWhatsAppLink = () => {
    const text = `Hi L'Ambroisie, I would like to book a table for ${formData.guests} guests on ${formData.date} at ${formData.time}. Selected Table: T${formData.tableNumber}. Occasion: ${formData.occasion}. Under name: ${formData.name}.`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-theme-card-bg border border-theme-card-border p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6">
      
      {/* Progress Stepper Header */}
      {step < 5 && (
        <div className="mb-8 border-b border-theme-card-border/20 pb-6">
          <div className="flex justify-between items-center relative max-w-lg mx-auto">
            {/* Background progress track line */}
            <div className="absolute top-[18px] left-0 right-0 h-0.5 bg-theme-card-border/20 z-0" />
            
            {/* Active progress track line fill */}
            <div 
              className="absolute top-[18px] left-0 h-0.5 bg-theme-accent transition-all duration-500 ease-out z-0" 
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {[
              { num: 1, label: 'Schedule' },
              { num: 2, label: 'Table Selection' },
              { num: 3, label: 'Your Details' },
              { num: 4, label: 'Review' }
            ].map(s => {
              const isActive = s.num === step;
              const isCompleted = s.num < step;
              
              return (
                <div key={s.num} className="flex flex-col items-center relative z-10">
                  <div 
                    className={`w-9 h-9 rounded-full flex items-center justify-center border font-semibold text-xs transition-all duration-500 ${
                      isActive 
                        ? 'bg-theme-accent text-theme-bg border-theme-accent shadow-lg shadow-theme-accent/20 scale-110 font-bold' 
                        : isCompleted 
                        ? 'bg-theme-accent/20 border-theme-accent text-theme-accent' 
                        : 'bg-theme-bg border-theme-card-border/50 text-theme-text-muted'
                    }`}
                  >
                    {isCompleted ? '✓' : s.num}
                  </div>
                  <span className={`text-[9px] tracking-wider uppercase font-semibold mt-2 transition-colors duration-300 ${isActive ? 'text-theme-accent font-bold' : 'text-theme-text-muted'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-500/10 border border-red-500/40 text-red-400 text-xs rounded-2xl">
          {errorMsg}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1: Date, Guests and Time selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <h3 className="text-3xl font-bold font-heading text-theme-text tracking-tight">Plan Your Gourmet Journey</h3>
              <p className="text-xs text-theme-text-muted font-light">Select guest volume, date, and preferred dining hour.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Guests Selector - 7 Columns on md */}
              <div className="space-y-3 md:col-span-7">
                <label className="text-xs font-bold uppercase tracking-widest text-theme-text-muted block">Guests</label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, '8+'].map(g => {
                    const val = typeof g === 'number' ? g : 8;
                    const isSelected = formData.guests === val;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData({ ...formData, guests: val })}
                        className="relative w-11 h-11 flex items-center justify-center rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer z-10"
                      >
                        {/* Text shifting */}
                        <span className={`relative z-20 transition-colors duration-300 ${isSelected ? 'text-theme-bg font-extrabold' : 'text-theme-text'}`}>
                          {g}
                        </span>

                        {/* Active bubble pill background */}
                        {isSelected && (
                          <motion.span
                            layoutId="activeGuestPill"
                            className="absolute inset-0 bg-theme-accent rounded-xl z-10"
                            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                          />
                        )}

                        {/* Inactive border background */}
                        {!isSelected && (
                          <span className="absolute inset-0 bg-theme-bg/40 border border-theme-card-border/40 rounded-xl z-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date Input - 5 Columns on md */}
              <div className="space-y-3 md:col-span-5">
                <label className="text-xs font-bold uppercase tracking-widest text-theme-text-muted block">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-11 pr-5 py-3.5 bg-theme-bg/40 border border-theme-card-border/60 text-theme-text rounded-2xl focus:outline-none focus:border-theme-accent text-sm font-semibold tracking-wider transition-colors"
                  />
                  <Calendar className="w-4.5 h-4.5 text-theme-accent absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Time slots grid */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-theme-text-muted block">Available Hours</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {timeSlots.map(t => {
                  const isSelected = formData.time === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({ ...formData, time: t })}
                      className={`relative py-3.5 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer overflow-hidden ${
                        isSelected
                          ? 'bg-theme-accent text-theme-bg border-theme-accent shadow-lg shadow-theme-accent/20 scale-105 font-extrabold'
                          : 'bg-theme-card-bg/25 border-theme-card-border/30 text-theme-text/80 hover:bg-theme-accent/5 hover:border-theme-accent/30'
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1.5">
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-theme-bg" />}
                        {t}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="group px-8 py-4 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-bold rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 transition-colors duration-300 cursor-pointer shadow-lg hover:shadow-theme-accent/10"
              >
                Choose Table <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Interactive Table Grid Picker */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <TableLayout
              selectedTable={formData.tableNumber}
              onSelectTable={(tNum) => setFormData({ ...formData, tableNumber: tNum })}
              occupiedTables={occupiedTables}
            />

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3.5 border border-theme-card-border hover:border-theme-accent text-theme-text font-semibold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3.5 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-bold rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 transition-colors duration-300 cursor-pointer shadow-lg"
              >
                Contact Info <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Contact Details Form */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold font-heading text-theme-text">Your Contact Details</h3>
              <p className="text-xs text-theme-text-muted">Fill in basic info to complete table seating validation.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-theme-text-muted block">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="E.g. Ashnoor Singh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-theme-bg/40 border border-theme-card-border/60 text-theme-text rounded-2xl focus:outline-none focus:border-theme-accent text-sm"
                  />
                  <User className="w-4.5 h-4.5 text-theme-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-theme-text-muted block">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-theme-bg/40 border border-theme-card-border/60 text-theme-text rounded-2xl focus:outline-none focus:border-theme-accent text-sm"
                  />
                  <Phone className="w-4.5 h-4.5 text-theme-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-theme-text-muted block">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-theme-bg/40 border border-theme-card-border/60 text-theme-text rounded-2xl focus:outline-none focus:border-theme-accent text-sm"
                  />
                  <Mail className="w-4.5 h-4.5 text-theme-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Occasion */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-theme-text-muted block">Occasion</label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full px-4 py-3 bg-theme-bg/40 border border-theme-card-border/60 text-theme-text rounded-2xl focus:outline-none focus:border-theme-accent text-sm"
                >
                  <option value="Casual Dining" className="bg-theme-bg">Casual Dining</option>
                  <option value="Birthday Celebration" className="bg-theme-bg">Birthday Celebration</option>
                  <option value="Anniversary" className="bg-theme-bg">Anniversary</option>
                  <option value="Business Lunch" className="bg-theme-bg">Business Meeting</option>
                  <option value="Date Night" className="bg-theme-bg">Date Night</option>
                </select>
              </div>
            </div>

            {/* Special Request */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-theme-text-muted block">Special Demands / Notes</label>
              <textarea
                placeholder="Vegetarian only, allergic to nuts, table decoration, high chair..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full px-4 py-3 h-24 bg-theme-bg/40 border border-theme-card-border/60 text-theme-text rounded-2xl focus:outline-none focus:border-theme-accent text-sm resize-none"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3.5 border border-theme-card-border hover:border-theme-accent text-theme-text font-semibold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3.5 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-bold rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 transition-colors duration-300 cursor-pointer shadow-lg"
              >
                Review Summary <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Review Summary & Loyalty signup */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold font-heading text-theme-text">Gourmet Seat Confirmation</h3>
              <p className="text-xs text-theme-text-muted font-light">Please verify details below before confirming table locking.</p>
            </div>

            {/* Visual ticket details */}
            <div className="p-6 bg-theme-bg/60 border border-theme-card-border/40 rounded-3xl space-y-4 text-sm text-theme-text-muted">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-theme-accent block">Diner Name</span>
                  <span className="text-theme-text font-semibold">{formData.name}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-theme-accent block">Guests Count</span>
                  <span className="text-theme-text font-semibold">{formData.guests} Portions</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-theme-card-border/20 pt-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-theme-accent block">Reserved Seating</span>
                  <span className="text-theme-text font-semibold">Table T{formData.tableNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-theme-accent block">Date & Time</span>
                  <span className="text-theme-text font-semibold">{formData.date} | {formData.time}</span>
                </div>
              </div>
            </div>

            {/* Loyalty Club option */}
            <div className="p-5 bg-theme-accent/5 rounded-2xl border border-theme-accent/20 flex gap-4 items-start">
              <input
                type="checkbox"
                id="loyalty-box"
                checked={formData.joinLoyalty}
                onChange={(e) => setFormData({ ...formData, joinLoyalty: e.target.checked })}
                className="mt-1 accent-theme-accent cursor-pointer"
              />
              <div>
                <label htmlFor="loyalty-box" className="font-heading font-bold text-sm text-theme-text block uppercase tracking-wider cursor-pointer">
                  Join L'Ambroisie Inner Circle Loyalty Club
                </label>
                <p className="text-xs text-theme-text-muted leading-relaxed mt-1">
                  Earn points on this reservation to redeem against signature dessert dishes or private wine masterclasses. Sign up is free.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="w-full sm:w-auto px-6 py-3.5 border border-theme-card-border hover:border-theme-accent text-theme-text font-semibold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full sm:w-auto px-8 py-3.5 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-bold rounded-xl text-xs uppercase tracking-widest transition-colors flex-grow shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                Confirm Booking <CheckCircle className="w-4.5 h-4.5" />
              </button>
              
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4.5 h-4.5" /> WhatsApp Booking
              </a>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Confirmation screen */}
        {step === 5 && confirmedBooking && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 space-y-6"
          >
            <CheckCircle className="w-16 h-16 text-theme-accent mx-auto animate-pulse" />
            <div className="space-y-2">
              <h3 className="text-3xl font-bold font-heading text-theme-text">Your Table is Locked!</h3>
              <p className="text-sm text-theme-text-muted">
                Reservation Confirmation ID: <strong className="text-theme-accent">{confirmedBooking._id}</strong>
              </p>
            </div>

            <p className="text-xs text-theme-text-muted max-w-sm mx-auto leading-relaxed font-light">
              An elegant email confirmation has been sent to <strong>{confirmedBooking.email}</strong>. We look forward to choreographing your fine dining service on <strong>{confirmedBooking.date}</strong> at <strong>{confirmedBooking.time}</strong>.
            </p>

            {formData.joinLoyalty && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-theme-accent/10 rounded-full border border-theme-accent/25 text-xs text-theme-accent">
                <Award className="w-4 h-4 animate-bounce" /> Inner Circle Membership Activated! +200 Points Added
              </div>
            )}

            <div className="pt-6">
              <button
                onClick={() => {
                  setStep(1);
                  setFormData({
                    guests: 2,
                    date: new Date().toISOString().split('T')[0],
                    time: '19:30',
                    tableNumber: null,
                    name: '',
                    email: '',
                    phone: '',
                    occasion: 'Casual Dining',
                    specialRequests: '',
                    joinLoyalty: false
                  });
                  setConfirmedBooking(null);
                }}
                className="px-8 py-3.5 bg-theme-card-bg hover:bg-theme-accent hover:text-theme-bg border border-theme-card-border text-theme-text font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
              >
                Book Another Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiStepForm;
