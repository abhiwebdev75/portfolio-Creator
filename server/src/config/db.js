import mongoose from 'mongoose';

/**
 * Connect to MongoDB using the MONGO_URI environment variable.
 * Throws (rejects) if the connection fails so the caller can exit.
 */
export default async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not set. Copy server/.env.example to server/.env and fill it in.');
  }

  mongoose.set('strictQuery', true);
  const conn = await mongoose.connect(uri);
  console.log(`MongoDB connected: ${conn.connection.host}`);
  return conn;
}
