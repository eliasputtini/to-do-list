//@ts-nocheck
"use client";
import React from "react";
import { useParams } from 'next/navigation'
import { Button } from "../ui/button";


const handleDelete = async (id, mutate, params) => {
  try {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    mutate();
  } catch (err) {
    console.log(err);
  }
};

function Delete({ id, mutate }: any) {

  const params = useParams()



  return (
    <Button
      className="text-right font-medium"
      onClick={(e) => {
        e.stopPropagation(); // Prevent propagation to the parent container

        handleDelete(id, mutate, params)
      }}
    >
      Delete
    </Button>
  );
}

export default Delete;
