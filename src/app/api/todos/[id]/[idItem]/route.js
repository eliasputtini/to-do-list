import { NextResponse } from "next/server";
import connect from "@/services/db"; 
import List from "@/models/List";

export const DELETE = async (request, { params }) => {
    console.log(params)
    const { id, idItem } = params; // Assuming you have separate IDs for list and item
    
    try {
      await connect(); // Connect to the database
  
      // Find the list containing the item by its ID
      const list = await List.find({permalink:id });
  
      // Check if the list exists
      if (!list) {
        return new NextResponse("List not found", { status: 404 });
      }

      // Find the index of the item to delete in the todos array
      const index = list[0].todos.findIndex(todo => todo._id.toString() === idItem);

      

      // Check if the item was found
      if (index === -1) {
          return new NextResponse("Item not found in the list", { status: 404 });
      }

      // Remove the item from the todos array
      list[0].todos.splice(index, 1);

      // Save the updated list document
      await list[0].save();
  
      return new NextResponse("Item has been deleted", { status: 200 });
    } catch (err) {
      console.error("Database Error:", err);
      return new NextResponse("Database Error", { status: 500 });
    }
  };


  export const PUT = async (request, { params }) => {
    const { id, idItem } = params; // Assuming you have separate IDs for list and item
        // Create a new Item using the request body
    const body = await request.json();
    const { value } = body; // Assuming you're passing title and description in the request body
 
    try {
      await connect(); // Connect to the database
  
      // Find the list containing the item by its ID
      const list = await List.find({ permalink: id });
  
      // Check if the list exists
      if (!list) {
        return new NextResponse("List not found", { status: 404 });
      }

      // Find the index of the item to update in the todos array
      const index = list[0].todos.findIndex(todo => todo._id.toString() === idItem);

      // Check if the item was found
      if (index === -1) {
          return new NextResponse("Item not found in the list", { status: 404 });
      }

      // Update the item with new title and description
      list[0].todos[index].check = value;
   

      // Save the updated list document
      await list[0].save();
      console.log('saved')
  
      return new NextResponse("Item has been updated", { status: 200 });
    } catch (err) {
      console.error("Database Error:", err);
      return new NextResponse("Database Error", { status: 500 });
    }
  };