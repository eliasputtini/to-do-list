import { NextResponse } from "next/server";
import connect from "@/services/db";
import Item from "@/models/Item";
import List from "@/models/List";

export const GET = async (request, { params }) => {
  const { id } = params;  

  try {
    await connect();
    const list = await List.find({permalink:id });
    

    if (!list) {
      return new NextResponse("List not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(list[0]), { status: 200 });
  } catch (err) { 
    return new NextResponse("Database Error", { status: 500 });
  }
};



export const POST = async (request, { params }) => {
  const { id } = params; 
  
  
  try {
    await connect();
    
    // Find the List document by its permalink
    const list = await List.findById(id);

    if (!list) {
      return new NextResponse("List not found", { status: 404 });
    }

    // Create a new Item using the request body
    const body = await request.json();
    const newItem = new Item(body);
    
    // Add the new item to the todos array of the List document
    if (!list.todos) {
      list.todos = []; // Ensure todos array exists
    }
    list.todos.push(newItem);
    
    // Save the updated List document
    await list.save();

    return new NextResponse("Item has been added to the List", { status: 201 });
  } catch (error) {
    console.error("Internal error:", error);
    return new NextResponse("Database Error", { status: 500 });
  }
};




