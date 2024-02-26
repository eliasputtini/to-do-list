"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "./delete";
import Put from "./put";


export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "number",
    header: "To-do List",
    cell: ({ row }) => {
      return <Put id={row.original._id} value={row.original.check} />
    },
  },
  {
    accessorKey: "text",
    header: " ",
  },
  {
    accessorKey: "",
    header: " ",
    cell: ({ row }) => {
      return <div className="flex justify-end"><Delete id={row.original._id} /></div>;
    },
  },
];
