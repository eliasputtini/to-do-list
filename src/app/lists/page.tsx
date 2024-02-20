//@ts-nocheck
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";

import { useState } from "react";

import React from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
 

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,FormDescription
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/invoices/data-table";
import { columns } from "@/components/invoices/columns"; 
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const formSchema = z.object({
    check: z.boolean(),
    date: z.date({
      required_error: "A date is required.",
    }), 
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      date: Date.now(),
      check: false, 
    },
  });

  const session = useSession();

  const router = useRouter();

  const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user?.name}`,
    fetcher
  );

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/login");
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { text } = values;

    console.log(text)
    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          check: false,
          text, 
          date : Date.now(), 
          username: session?.data?.user?.name || "anonymous",
        }),
      });
      mutate();
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  if (session.status === "authenticated") {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col flex-1 gap-10">
          <div className="flex justify-between">
            <div>
              <p className="">Receita anual R$ {data?.totalRevenue}</p>
              <p className="">
                Faturamento restante dentro do limite do MEI R$&nbsp;
                {81000 - data?.totalRevenue}
              </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <div className="p-5 bg-[#e8505b] rounded text-white font-bold">
                  Crie uma tarefa
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="py-3">
                    Crie uma tarefa
                  </DialogTitle>

                  <div className="space-y-1 leading-none">
                        <p className="text-sm font-medium ">
                          Tarefa para a todolist de &#39;{session?.data?.user?.name}&#39;
                        </p>
                        <p className="text-sm font-medium text-muted-foreground">
                          Digite uma tarefa a seguir
                        </p>
                  </div>
                  <Form {...form}> 
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    > 
                       <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                              <Input placeholder="Text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />     
                      <Button type="submit">Send</Button>
                    </form>
                  </Form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            {isLoading ? (
              "loading"
            ) : (
              <DataTable columns={columns} data={data.posts} mutate={mutate} />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
