import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI: string | undefined = process.env.MONGO_URI;

async function connectDB(): Promise<void> {
  try {
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in the environment variables.');
    }

    await mongoose.connect(mongoURI);
    console.log('---👀-----Connected to MongoDB---👀------');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
  }
}

export default connectDB;
