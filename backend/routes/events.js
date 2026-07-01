import express from 'express';
import Event from '../models/Event.js';
import mongoose from 'mongoose';

const router = express.Router();

const initialEvents = [
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

// Seed Endpoint (internal/setup)
router.post('/seed', async (req, res) => {
  try {
    await Event.deleteMany({});
    const seeded = await Event.insertMany(initialEvents);
    res.status(201).json({ message: "Events seeded successfully", count: seeded.length });
  } catch (error) {
    res.status(500).json({ message: "Error seeding events", error: error.message });
  }
});

let currentEvents = null;

const getEventsData = async () => {
  if (mongoose.connection.readyState === 1) {
    return await Event.find({});
  } else {
    if (!currentEvents) {
      currentEvents = initialEvents.map((ev, index) => ({
        _id: `mock-event-${index}`,
        ...ev
      }));
    }
    return currentEvents;
  }
};

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await getEventsData();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
});

// POST book event tickets
router.post('/book', async (req, res) => {
  try {
    const { eventId, tickets, name, email } = req.body;
    if (!eventId || !tickets || !name || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (mongoose.connection.readyState !== 1) {
      // Offline fallback: update in-memory array
      if (!currentEvents) {
        currentEvents = initialEvents.map((ev, index) => ({
          _id: `mock-event-${index}`,
          ...ev
        }));
      }
      const event = currentEvents.find(ev => ev._id === eventId || ev.title === eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      if (event.spotsLeft < tickets) {
        return res.status(400).json({ message: "Not enough tickets available" });
      }
      event.spotsLeft -= tickets;
      return res.json({ message: "Event booked successfully (Offline Mode)", event });
    }

    // Online DB update
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.spotsLeft < tickets) {
      return res.status(400).json({ message: "Not enough tickets available" });
    }
    event.spotsLeft -= tickets;
    await event.save();
    res.json({ message: "Event booked successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Error booking event", error: error.message });
  }
});

export default router;
