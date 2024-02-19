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

export const DELETE = async (id) => {
 

  try {
    await connect();

    // Find the post by ID and delete it
    const deletedPost = await Post.findOneAndDelete({ _id: id });console.log(deletedPost)


    if (!deletedPost) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

