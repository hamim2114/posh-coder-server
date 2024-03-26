import mongoose, {Schema} from 'mongoose';

const GraphicTemplateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
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
export default mongoose.model('GraphicTemplate', GraphicTemplateSchema);
