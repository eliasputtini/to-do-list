import { NextResponse } from "next/server";
import connect from "@/services/db";
import Post from "@/models/Post";

export const GET = async (request) => {
  const url = new URL(request.url);

  const username = url.searchParams.get("username");

  try {
    await connect();

    const posts = await Post.find(username && { username });

    const totalRevenue = posts.reduce(
      (total, post) => total + parseFloat(post.value || 0),
      0
    );

    const responseData = {
      totalRevenue,
      posts,
    };

    return new NextResponse(JSON.stringify(responseData), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  const newPost = new Post(body);

  try {
    await connect();

    await newPost.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export async function DELETE(id) {
  try { 

   
    console.log( await Post.find(id))
    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
 