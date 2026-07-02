import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import connectDB from './config/db.js';

// Route imports
import menuRouter from './routes/menu.js';
import reservationRouter from './routes/reservations.js';
import eventsRouter from './routes/events.js';

// Models for autoseed check
import MenuItem from './models/MenuItem.js';
import Event from './models/Event.js';

dotenv.config();

const app = express();

// Production ready middleware
app.use(helmet());
app.use(compression());

// Logger middleware
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { message: "Too many requests from this IP, please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

// Booking Rate Limiter (Tighter limit to prevent spam)
const bookingLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // Limit each IP to 10 booking requests per windowMs
  message: { message: "Too many bookings attempted from this IP, please try again after 10 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Database connection & Auto-seeding
connectDB().then(async () => {
  try {
    // Auto-seed Menu Items if empty
    const menuCount = await MenuItem.countDocuments({});
    if (menuCount === 0) {
      console.log('Menu collection is empty. Auto-seeding initial dishes...');
      const menuSeedData = [
        {
          name: "Wild Forest Mushroom Tartlet",
          description: "A delicate butter pastry filled with caramelized wild chanterelles, black truffle cream, and fresh micro-herbs.",
          price: 850,
          category: "Starters",
          image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80",
          tags: ["Veg", "Chef Special"],
          ingredients: ["Chanterelles", "Truffle oil", "Puff pastry", "Mascarpone", "Micro-greens"],
          calories: 320,
          winePairing: { name: "Pinot Noir", type: "Red", description: "An earthy red that echoes the mushroom tones." },
          story: "Foraged by hand in local temperate pine woods, our chanterelle mushrooms are carefully cleaned and sautéed with butter and thyme within 6 hours of harvest.",
          isSignature: true
        },
        {
          name: "Tomato Basil Bruschetta",
          description: "Toasted artisanal sourdough rubbed with garlic, topped with marinated heirloom tomatoes, fresh basil, and a drizzle of 25-year aged balsamic.",
          price: 650,
          category: "Starters",
          image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=600&q=80",
          tags: ["Veg", "Vegan"],
          ingredients: ["Sourdough", "Heirloom tomatoes", "Garlic", "Basil", "Balsamic vinegar"],
          calories: 210,
          winePairing: { name: "Pinot Grigio", type: "White", description: "A crisp white that matches the tomato acidity." },
          story: "Our heirloom tomatoes are picked at peak ripeness from our greenhouse and seasoned with hand-harvested sea salt.",
          isSignature: false
        },
        {
          name: "French Onion Soup",
          description: "Slow-caramelized yellow onions simmered in a rich beef bone broth, finished with a toasted gruyère crouton.",
          price: 750,
          category: "Starters",
          image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
          tags: ["Chef Special"],
          ingredients: ["Onions", "Beef broth", "Sourdough crouton", "Gruyere cheese", "Thyme"],
          calories: 340,
          winePairing: { name: "Chablis", type: "White", description: "A mineral-forward Chardonnay to balance the sweet onions." },
          story: "It takes our chefs 8 hours of slow-stirring to caramelize the sweet onions to a perfect deep amber color before adding our 48-hour bone broth.",
          isSignature: false
        },
        {
          name: "Truffle Glazed Filet Mignon",
          description: "Prime dry-aged beef tenderloin with a bone marrow crust, roasted asparagus, and dark cherry jus.",
          price: 2450,
          category: "Mains",
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
          tags: ["Gluten Free"],
          ingredients: ["Beef tenderloin", "Asparagus", "Bone marrow", "Red wine reduction", "Morels"],
          calories: 680,
          winePairing: { name: "Cabernet Sauvignon", type: "Red", description: "Bold tannins cut through the rich marbled cut." },
          story: "Aged for 28 days in our custom Himalayan salt chamber, our grass-fed tenderloin is cooked to medium-rare over a hickory fire wood grill.",
          isSignature: true
        },
        {
          name: "Saffron & Lobster Risotto",
          description: "Acquerello aged carnaroli rice, poached butter lobster tail, saffron stamens, and fresh Parmigiano-Reggiano.",
          price: 1850,
          category: "Mains",
          image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
          tags: ["Gluten Free", "Chef Special"],
          ingredients: ["Carnaroli rice", "Lobster tail", "Saffron", "Parmesan", "White wine"],
          calories: 590,
          winePairing: { name: "Sauvignon Blanc", type: "White", description: "Crisp minerality balances the sweet lobster meat." },
          story: "Our rice is dry-aged for seven years to ensure maximum starch absorption, resulting in a velvety creaminess cooked with authentic Persian saffron.",
          isSignature: true
        },
        {
          name: "Pan-Seared Sea Bass",
          description: "Fillet of Chilean sea bass seared to perfection, served with wilted baby spinach, saffron-infused butter sauce, and micro-herbs.",
          price: 2150,
          category: "Mains",
          image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
          tags: ["Gluten Free", "Chef Special"],
          ingredients: ["Chilean Sea Bass", "Spinach", "Saffron butter", "Lemon", "Micro-herbs"],
          calories: 450,
          winePairing: { name: "Sauvignon Blanc", type: "White", description: "Bright citrus notes that cut through the rich butter sauce." },
          story: "Line-caught in the pristine sub-Antarctic waters, our sea bass is delivered fresh daily and pan-seared to lock in moisture.",
          isSignature: false
        },
        {
          name: "Golden Chocolate Sphere",
          description: "A dark Valrhona chocolate dome filled with salted caramel mousse, roasted hazelnut crunch, melted with warm dark rum fudge sauce.",
          price: 750,
          category: "Desserts",
          image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
          tags: ["Veg", "Chef Special"],
          ingredients: ["Valrhona chocolate", "Salted caramel", "Hazelnut", "Rum", "24k Gold leaf"],
          calories: 450,
          winePairing: { name: "Tawny Port", type: "Dessert", description: "Notes of dried fig and hazelnut mirror the dessert." },
          story: "Crafted by hand in our pastry kitchen, the chocolate dome is spray-finished with culinary 24k gold dust, melting in front of the diner's eyes upon pouring our signature hot sauce.",
          isSignature: true
        },
        {
          name: "Madagascar Vanilla Crème Brûlée",
          description: "Classic rich custard infused with organic Madagascar vanilla beans, topped with a layer of hardened caramelized sugar.",
          price: 680,
          category: "Desserts",
          image: "https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&w=600&q=80",
          tags: ["Veg", "Gluten Free"],
          ingredients: ["Heavy cream", "Egg yolks", "Sugar", "Madagascar vanilla bean"],
          calories: 380,
          winePairing: { name: "Sauternes", type: "Dessert", description: "A sweet honeyed dessert wine that mirrors the vanilla notes." },
          story: "We use only A-grade vanilla pods imported directly from Madagascar, scraped by hand to ensure the finest flavor distribution in our custard.",
          isSignature: false
        },
        {
          name: "Classic Tiramisu",
          description: "Layers of espresso-soaked ladyfingers and velvety mascarpone cream, dusted with organic Valrhona cocoa powder.",
          price: 720,
          category: "Desserts",
          image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
          tags: ["Veg"],
          ingredients: ["Mascarpone", "Espresso", "Ladyfingers", "Cocoa powder", "Marsala wine"],
          calories: 420,
          winePairing: { name: "Tawny Port", type: "Dessert", description: "Rich, nutty profile that elevates the espresso and cocoa tones." },
          story: "Our espresso blend is roasted specifically for our tiramisu, extracting deep chocolate notes that blend beautifully with the Italian mascarpone.",
          isSignature: false
        },
        {
          name: "Smoked Rosemary Old Fashioned",
          description: "High-rye bourbon, charred rosemary syrup, angostura bitters, served under a smoke-filled glass cloche.",
          price: 650,
          category: "Drinks",
          image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
          tags: ["Vegan"],
          ingredients: ["Rye Bourbon", "Rosemary", "Angostura bitters", "Orange peel", "Oak smoke"],
          calories: 140,
          winePairing: { name: "Charred Cedarwood Cigar", type: "Smoke", description: "The visual smoke aromatics complement a premium cigar." },
          story: "Served in a glass cloche smoked with toasted cherrywood chips, this cocktail releases clean cedar aromas as it is uncovered table-side.",
          isSignature: false
        },
        {
          name: "Hibiscus Lavender Mocktail",
          description: "A refreshing infusion of dried organic hibiscus petals, lavender syrup, fresh lime juice, and sparkling water.",
          price: 480,
          category: "Drinks",
          image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80",
          tags: ["Vegan", "Veg"],
          ingredients: ["Hibiscus", "Lavender syrup", "Lime juice", "Sparkling water", "Mint"],
          calories: 90,
          winePairing: { name: "N/A", type: "Alcohol-Free", description: "This botanical drink is self-complete." },
          story: "The hibiscus blossoms are cold-steeped for 12 hours to capture their vibrant crimson hue and tart berry profile without any bitterness.",
          isSignature: false
        },
        {
          name: "Cucumber Basil Gimlet",
          description: "Premium botanical gin shaken with fresh muddled cucumber, sweet basil leaves, and lime juice.",
          price: 620,
          category: "Drinks",
          image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
          tags: ["Vegan", "Veg"],
          ingredients: ["Gin", "Cucumber", "Basil", "Lime juice", "Simple syrup"],
          calories: 160,
          winePairing: { name: "N/A", type: "Cocktail", description: "Best enjoyed on its own as a crisp, herbaceous aperitif." },
          story: "English cucumbers are pressed fresh every afternoon, providing a crisp, cooling element that highlights the botanicals in our house gin.",
          isSignature: false
        }
      ];
      await MenuItem.insertMany(menuSeedData);
      console.log('Seeded initial menu items successfully.');
    }

    // Auto-seed Events if empty
    const eventCount = await Event.countDocuments({});
    if (eventCount === 0) {
      console.log('Events collection is empty. Auto-seeding initial events...');
      const eventSeedData = [
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
      await Event.insertMany(eventSeedData);
      console.log('Seeded initial events successfully.');
    }
  } catch (err) {
    console.error('Error during auto-seeding:', err.message);
  }
});

// Routes
app.use('/api/menu', menuRouter);
app.use('/api/reservations', bookingLimiter, reservationRouter);
app.post('/api/events/book', bookingLimiter);
app.use('/api/events', eventsRouter);

app.get('/', (req, res) => {
  res.send('Premium Restaurant API is running.');
});

// Fallback error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected server error occurred." });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\nReceived ${signal}. Starting graceful shutdown...`);
  server.close(() => {
    console.log('HTTP server closed.');
    mongoose.connection.close().then(() => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    }).catch(err => {
      console.error('Error closing MongoDB connection:', err);
      process.exit(1);
    });
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
