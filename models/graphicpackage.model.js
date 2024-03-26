import mongoose, {Schema} from 'mongoose';

const GraphicPackageSchema = new Schema(
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
export default mongoose.model('GraphicPackage', GraphicPackageSchema);
