import mongoose, { Schema } from "mongoose";

const GallerySchema = new Schema(
  {
    image: {
      type: String,
      required: true
    },
    imgId: {
      type: String,
      required: true
    }
  },{timestamps: true}
);

export default mongoose.model('Gallery', GallerySchema);