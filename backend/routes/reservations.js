import express from 'express';
import Reservation from '../models/Reservation.js';
import mongoose from 'mongoose';

const router = express.Router();

let currentReservations = [];

// GET occupied tables for a date and time
router.get('/availability', async (req, res) => {
  try {
    const { date, time } = req.query;
    if (!date || !time) {
      return res.status(400).json({ message: "Date and time are required" });
    }

    if (mongoose.connection.readyState !== 1) {
      // Offline fallback: filter in-memory reservations
      const occupiedTables = currentReservations
        .filter(r => r.date === date && r.time === time && r.status === 'Confirmed')
        .map(r => r.tableNumber)
        .filter(num => num !== undefined && num !== null);
      return res.json({ occupiedTables });
    }

    // Find all active reservations at that date and time slot (exactly matching or +/- 1 hour slot)
    const bookings = await Reservation.find({
      date,
      time,
      status: 'Confirmed'
    });

    const occupiedTables = bookings
      .map(b => b.tableNumber)
      .filter(num => num !== undefined && num !== null);

    res.json({ occupiedTables });
  } catch (error) {
    res.status(500).json({ message: "Error fetching table availability", error: error.message });
  }
});

// POST new reservation
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, guests, date, time, tableNumber, occasion, specialRequests } = req.body;

    if (!name || !email || !phone || !guests || !date || !time) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (mongoose.connection.readyState !== 1) {
      // Offline fallback: update in-memory reservations
      if (tableNumber) {
        const existing = currentReservations.find(r => 
          r.date === date && r.time === time && r.tableNumber === tableNumber && r.status === 'Confirmed'
        );
        if (existing) {
          return res.status(400).json({
            message: `Table number ${tableNumber} is already reserved for this date and time slot. Please choose another table.`
          });
        }
      }
      const reservation = {
        _id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        name, email, phone, guests, date, time, tableNumber, occasion, specialRequests,
        status: 'Confirmed'
      };
      currentReservations.push(reservation);
      return res.status(201).json({
        message: "Reservation confirmed successfully! (Offline Mode)",
        reservation
      });
    }

    // Check if table is already booked for this time
    if (tableNumber) {
      const existingBooking = await Reservation.findOne({
        date,
        time,
        tableNumber,
        status: 'Confirmed'
      });

      if (existingBooking) {
        return res.status(400).json({
          message: `Table number ${tableNumber} is already reserved for this date and time slot. Please choose another table.`
        });
      }
    }

    const reservation = new Reservation({
      name,
      email,
      phone,
      guests,
      date,
      time,
      tableNumber,
      occasion,
      specialRequests,
      status: 'Confirmed' // auto confirm in this demonstration
    });

    const savedReservation = await reservation.save();
    res.status(201).json({
      message: "Reservation confirmed successfully!",
      reservation: savedReservation
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error: error.message });
  }
});

export default router;
