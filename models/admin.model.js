import mongoose, {Schema} from 'mongoose';

const AdminSchema = new Schema(
  {
    name: {
      type: String,
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
  },
  {timestamps: true}
);
export default mongoose.model('Admin', AdminSchema);
