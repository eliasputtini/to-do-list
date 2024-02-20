"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "./delete";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { table } from "console";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "number",
    header: "NFS-e Number",
    cell: ({ row }) => {
      return <p> <Checkbox
      checked={
        row.original.checked 
      }
      onCheckedChange={(value) => console.log(!!value)}
      aria-label="Select all"
    /></p>;
    },
  },
  {
    accessorKey: "date",
    header: "Emission date",
    cell: ({ row }) => {
      return <p>{format(row.original.date, 'dd/MM/yyyy')}</p>;
    },
  }, 
  {
    accessorKey: "payDate",
    header: "NFS-e Payday",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "jobType",
    header: "Service type",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "",
    header: " ",
    cell: ({ row }) => {
      return <Delete id={row.original._id} />;
    },
  },
];
