//@ts-nocheck
"use client";
 import { DELETE } from "@/app/api/posts/route";

//@ts-nocheck
import React from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";

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
        DELETE(id)
        // mutate();
      }}
    >
      delete
    </div>
  );
}

export default Delete;
