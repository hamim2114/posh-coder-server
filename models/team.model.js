import mongoose, {Schema} from 'mongoose';

const TeamSchema = new Schema(
  {
    img: {
      type: String,
    },
    imgId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      default: '000000'
    },
    email: {
      type: String,
      default: 'Empty'
    },
    facebook: {
      type: String,
      default: 'Empty'
    },
  },
  {timestamps: true}
);
export default mongoose.model('Team', TeamSchema);
