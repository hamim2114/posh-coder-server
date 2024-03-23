import mongoose, {Schema} from 'mongoose';

const AuthSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);
export default mongoose.model('Auth', AuthSchema);
