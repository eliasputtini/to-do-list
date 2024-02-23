"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "./delete";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "number",
    header: "To-do List",
    size: 10,
    cell: ({ row }) => {
      return <div> <Checkbox
        checked={
          row.original.checked
        }
        onCheckedChange={(value) => console.log(!!value)}
        aria-label="Select all"
      /></div>;
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
