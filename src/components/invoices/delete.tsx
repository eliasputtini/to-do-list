//@ts-nocheck
"use client"; import Post from "@/models/Post";
//@ts-nocheck
import React from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
 

const handleDelete = async (id,mutate) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    mutate();
  } catch (err) {
    console.log(err);
  }
};

function Delete({ id }: any) {
  const session = useSession();

  const fetcher = (...args: any) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user?.name}`,
    fetcher
  );

  return (
    <div
      className="text-right font-medium"
      onClick={() => {
        handleDelete(id,mutate)
        // mutate();
      }}
    >
      delete
    </div>
  );
}

export default Delete;
