import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: Number, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  time: { type: String, required: true }, // Format: HH:MM
  tableNumber: { type: Number }, // Selected table from 2D floor plan
  occasion: { type: String, default: 'Casual Dining' }, // Birthday, Anniversary, Business, Date Night, etc.
  specialRequests: { type: String },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Confirmed' }
}, {
  timestamps: true
});

// Compound indexes for production query performance
reservationSchema.index({ date: 1, time: 1, status: 1 });
reservationSchema.index({ date: 1, time: 1, tableNumber: 1, status: 1 });

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
