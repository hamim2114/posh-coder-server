import mongoose, {Schema} from 'mongoose';

const WebTamplateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    imgId: {
      type: String,
    },
  },
  {timestamps: true}
);
export default mongoose.model('WebTamplate', WebTamplateSchema);
