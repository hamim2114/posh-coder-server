import mongoose, { Schema } from "mongoose";

const TrustBy = new Schema(
  {
    imgUrl: {
      type: String,
      required: true
    },
    imgId: {
      type: String,
      required: true
    }
  },{timestamps: true}
);

export default mongoose.model('TrustBy', TrustBy);