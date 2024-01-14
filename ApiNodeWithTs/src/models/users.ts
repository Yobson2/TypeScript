import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  nom: string;
  email: string;
  password: string;
  image: string;
  created: Date;
}

const userSchema: Schema<User> = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model<User>('User', userSchema);
