import mongoose, {Schema} from 'mongoose';

const OrderSchema = new Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    name:{
      type: String,
      required: true,
    },
    phone:{
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);
export default mongoose.model('Order', OrderSchema);
