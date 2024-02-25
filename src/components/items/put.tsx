//@ts-nocheck
"use client";
import React from "react";
import useSWR from "swr";
import { useParams } from 'next/navigation'
import { Checkbox } from "../ui/checkbox";


const handlePut = async (id, value, mutate, params) => {
  try {
    await fetch(`/api/todos/${params.id}/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        value,
      }),
    });
    mutate();
  } catch (err) {
    console.log(err);
  }
};

function Put({ id, value }: any) {
  const params = useParams()


  const fetcher = (...args: any) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `/api/todos/${params.id}`,
    fetcher
  );

  return (

    <Checkbox
      checked={value}
      onCheckedChange={(value) => handlePut(id, value, mutate, params)}
      aria-label="Select all"
    />
  );
}

export default Put;
