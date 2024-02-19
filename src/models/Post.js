import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    payDate: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose?.models?.Post || mongoose.model("Post", PostSchema);
