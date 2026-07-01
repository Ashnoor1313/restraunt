import React, { useState, useEffect } from 'react';
import { Calendar, Users, Ticket, CheckCircle, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultEvents = [
  {
    title: "Midnight Jazz & Cabernet",
    description: "An intimate evening featuring live performances by the renowned Blue Note Trio, paired with select reserve Cabernet sauvignons.",
    date: "2026-07-04",
    time: "21:00",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    type: "Live Music",
    price: 1500,
    spotsTotal: 30,
    spotsLeft: 12
  },
  {
    title: "Old World Wine Masterclass",
    description: "Sample rare vintages from Bordeaux, Tuscany, and Rioja under the guidance of our Head Sommelier, accompanied by dry-aged charcuterie pairings.",
    date: "2026-07-11",
    time: "18:30",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
    type: "Wine Tasting",
    price: 3200,
    spotsTotal: 15,
    spotsLeft: 4
  },
  {
    title: "Exclusive Chef's Table",
    description: "An extraordinary 9-course experimental menu prepared table-side by Executive Chef Marco Vancini, exploring modern molecular gastronomy.",
    date: "2026-07-18",
    time: "19:30",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
    type: "Chef Table",
    price: 5500,
    spotsTotal: 8,
    spotsLeft: 2
  }
];

const EventsPage = () => {
  const [events, setEvents] = useState(defaultEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', tickets: 1 });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    document.title = "Gourmet Live Events & Calendar | L'Ambroisie";
  }, []);

  // Fetch events from backend API on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/events');
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (err) {
        // Fallback to defaultEvents if API is not active
      }
    };
    fetchEvents();
  }, []);

  const handleBookEvent = async (e) => {
    e.preventDefault();
    if (bookingForm.name && bookingForm.email && selectedEvent) {
      try {
        const res = await fetch('http://localhost:5000/api/events/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventId: selectedEvent._id || selectedEvent.id || selectedEvent.title,
            tickets: bookingForm.tickets,
            name: bookingForm.name,
            email: bookingForm.email
          })
        });
        const data = await res.json();
        if (res.ok) {
          setBookingSuccess(true);
          // Update local events state to reflect spots left
          setEvents(prev => prev.map(ev => {
            const evId = ev._id || ev.id || ev.title;
            const selId = selectedEvent._id || selectedEvent.id || selectedEvent.title;
            if (evId === selId) {
              return { ...ev, spotsLeft: ev.spotsLeft - bookingForm.tickets };
            }
            return ev;
          }));
          setTimeout(() => {
            setBookingSuccess(false);
            setSelectedEvent(null);
            setBookingForm({ name: '', email: '', tickets: 1 });
          }, 3000);
        } else {
          alert(data.message || 'Error booking event.');
        }
      } catch (err) {
        // Fallback offline mode simulation
        setBookingSuccess(true);
        setEvents(prev => prev.map(ev => {
          if (ev.title === selectedEvent.title) {
            return { ...ev, spotsLeft: Math.max(0, ev.spotsLeft - bookingForm.tickets) };
          }
          return ev;
        }));
        setTimeout(() => {
          setBookingSuccess(false);
          setSelectedEvent(null);
          setBookingForm({ name: '', email: '', tickets: 1 });
        }, 3000);
      }
    }
  };

  return (
    <div className="pt-32 pb-24 bg-theme-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-theme-accent font-semibold flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-theme-accent" /> Exclusive Soirées
          </p>
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-theme-text">Gourmet Events</h1>
          <p className="text-sm text-theme-text-muted leading-relaxed font-light">
            Reserve a pass to our ticketed wine-masterclasses, candlelit jazz programs, and custom chef counter dinners.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {events.map((ev, idx) => (
            <div
              key={idx}
              className="group rounded-3xl bg-theme-card-bg border border-theme-card-border/40 overflow-hidden hover:border-theme-accent/40 shadow-xl flex flex-col justify-between"
            >
              <div className="aspect-video relative overflow-hidden">
                <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-black/85 backdrop-blur-md text-[9px] font-bold text-theme-accent border border-theme-accent/20 uppercase tracking-widest">
                  {ev.type}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] text-theme-accent font-bold uppercase tracking-wider">{ev.date} | {ev.time}</span>
                    <span className="text-sm font-bold text-theme-text">₹{ev.price}</span>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-theme-text">{ev.title}</h3>
                  <p className="text-xs text-theme-text-muted leading-relaxed font-light">{ev.description}</p>
                </div>

                <div className="pt-4 border-t border-theme-card-border/30 flex justify-between items-center text-xs text-theme-text-muted">
                  <span>Spots Left: <strong className="text-theme-text">{ev.spotsLeft}</strong> / {ev.spotsTotal}</span>
                  <button
                    onClick={() => setSelectedEvent(ev)}
                    className="px-4 py-2 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-bold rounded-xl text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Reserve Pass
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Event Booking Modal Popover */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              className="w-full max-w-md bg-theme-bg border border-theme-card-border p-8 rounded-3xl shadow-2xl relative space-y-6"
            >
              {/* Close trigger */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-5 right-5 text-theme-text-muted hover:text-theme-text text-sm cursor-pointer"
              >
                Close
              </button>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-theme-accent font-bold">Event Reservation</span>
                <h3 className="text-xl font-bold font-heading text-theme-text">{selectedEvent.title}</h3>
                <p className="text-xs text-theme-text-muted">{selectedEvent.date} at {selectedEvent.time}</p>
              </div>

              {!bookingSuccess ? (
                <form onSubmit={handleBookEvent} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-theme-text-muted">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-theme-bg border border-theme-card-border/60 text-theme-text text-sm rounded-xl focus:outline-none focus:border-theme-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-theme-text-muted">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-theme-bg border border-theme-card-border/60 text-theme-text text-sm rounded-xl focus:outline-none focus:border-theme-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-theme-text-muted">Number of Tickets</label>
                    <input
                      type="number"
                      min="1"
                      max={selectedEvent.spotsLeft}
                      required
                      value={bookingForm.tickets}
                      onChange={(e) => setBookingForm({ ...bookingForm, tickets: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-3 bg-theme-bg border border-theme-card-border/60 text-theme-text text-sm rounded-xl focus:outline-none focus:border-theme-accent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                  >
                    Confirm Event Pass
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <CheckCircle className="w-12 h-12 text-theme-accent mx-auto animate-pulse" />
                  <h4 className="font-heading font-bold text-lg text-theme-text">Pass Confirmed!</h4>
                  <p className="text-xs text-theme-text-muted leading-relaxed">
                    Check your email for the digital event tickets and QR code access codes.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsPage;
