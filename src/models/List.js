import mongoose from "mongoose";
import Item from "./Item"; // Import the  schema/model

const { Schema } = mongoose;

const ListSchema = new Schema(
  {
    todos: {
      type: [Item.schema], // Define the array of TodoItem schema
      default: [], // Provide a default value if needed
    },
    title: {
      type: String,
      required: true,
    },
    permalink: {
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

//If the ListSchema collection does not exist create a new one.
export default mongoose.models?.List || mongoose.model('List', ListSchema);
