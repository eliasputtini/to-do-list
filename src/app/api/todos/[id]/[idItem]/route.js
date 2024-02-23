import { NextResponse } from "next/server";
import connect from "@/services/db"; 
import List from "@/models/List";

export const DELETE = async (request, { params }) => {
    console.log(params)
    const { id, itemId } = params; // Assuming you have separate IDs for list and item
    
    try {
      await connect(); // Connect to the database
  
      // Find the list containing the item by its ID
      const list = await List.find({permalink:id });
  
      // Check if the list exists
      if (!list) {
        return new NextResponse("List not found", { status: 404 });
      }

      // Find the index of the item to delete in the todos array
      const index = list[0].todos.findIndex(todo => todo._id.toString() === itemId);

      
      console.log(index)

      // Check if the item was found
      if (index === -1) {
          return new NextResponse("Item not found in the list", { status: 404 });
      }

      // Remove the item from the todos array
      list.todos.splice(index, 1);

      // Save the updated list document
      await list.save();
  
      return new NextResponse("Item has been deleted", { status: 200 });
    } catch (err) {
      console.error("Database Error:", err);
      return new NextResponse("Database Error", { status: 500 });
    }
  };