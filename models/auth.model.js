import mongoose from 'mongoose';

const { Schema } = mongoose;

const AuthSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true // Optional: Ensures there are no leading or trailing spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'] // Optional: Email validation
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: String,
    verificationTokenExpiry: Date
  },
  { timestamps: true }
);

export default mongoose.model('Auth', AuthSchema);
