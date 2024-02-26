//@ts-nocheck
"use client";
import React from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button";


const handleDelete = async (id, mutate, params) => {
  try {
    await fetch(`/api/todos/${params.id}/${id}`, {
      method: "DELETE",
    });
    mutate();
  } catch (err) {
    console.log(err);
  }
};

function Delete({ id }: any) {

  const params = useParams()

  const session = useSession();

  const fetcher = (...args: any) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `/api/todos/${params.id}`,
    fetcher
  );

  return (
    <Button
      className="text-right font-medium"
      variant='destructive'
      onClick={() => {
        handleDelete(id, mutate, params)
      }}
    >
      delete
    </Button>
  );
}

export default Delete;
