import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  time: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, enum: ['Live Music', 'Wine Tasting', 'Private Dining', 'Chef Table', 'Corporate Events'], required: true },
  price: { type: Number },
  spotsTotal: { type: Number },
  spotsLeft: { type: Number }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
