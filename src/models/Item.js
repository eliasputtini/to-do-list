import mongoose from "mongoose";

const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    check: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//If the Item collection does not exist create a new one.
export default mongoose.models?.Item || mongoose.model('Item', ItemSchema);
