import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/premium-restaurant');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection warning: ${error.message}`);
    console.log('Server will proceed to boot in offline/fallback mode.');
  }
};

export default connectDB;
