import mongoose, {Schema} from 'mongoose';

const WebpackageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    details: {
      type: Array,
      required: true
    }
  },
  {timestamps: true}
);
export default mongoose.model('WebPackage', WebpackageSchema);
