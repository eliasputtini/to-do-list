import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    check: {
      type: Boolean,
      required: true,
    },
    text: {
      type: Date,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models?.Post || mongoose.model('Post', PostSchema);
