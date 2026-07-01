import mongoose from 'mongoose';

const winePairingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g. 'Red', 'White', 'Sparkling'
  description: { type: String }
});

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g. 'Starters', 'Mains', 'Desserts', 'Drinks'
  image: { type: String, required: true },
  tags: [{ type: String }], // e.g. 'Veg', 'Vegan', 'Gluten Free', 'Spicy', 'Chef Special'
  ingredients: [{ type: String }],
  calories: { type: Number },
  winePairing: winePairingSchema,
  story: { type: String }, // For the "Ingredient Story" feature
  isSignature: { type: Boolean, default: false }
}, {
  timestamps: true
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
