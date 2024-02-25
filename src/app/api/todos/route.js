import { NextResponse } from "next/server";
import connect from "@/services/db"; 
import List from "@/models/List";

export const GET = async (request) => {
  const url = new URL(request.url);

  const username = url.searchParams.get("username");

  try {
    await connect();

    const todos = await List.find(username && { username });

    return new NextResponse(JSON.stringify(todos), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  const newPost = new List(body);

  try {
    await connect();

    await newPost.save();

    return new NextResponse("TodoList has been created", { status: 201 });
  } catch (error) { 
    console.dir(error);  // print on server console
    res.status(500).json({ message: "Internal error", error: error }); // not needed, only if you need in client side
    return;
  }
};