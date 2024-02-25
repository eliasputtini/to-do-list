"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "./delete";
import Put from "./put";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "number",
    header: "To-do List",
    size: 10,
    cell: ({ row }) => {
      return <Put id={row.original._id} value={row.original.check} />
    },
  },
  {
    accessorKey: "text",
    header: " ",
    size: 300,
  },
  {
    accessorKey: "",
    header: " ",
    size: 300,
    minSize: 0,
    cell: ({ row }) => {
      return <Delete id={row.original._id} />;
    },
  },
];
