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
import { cn } from "@/lib/utils";
import { format } from "date-fns"

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
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
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const formSchema = z.object({
    number: z.string().min(2).max(50),
    date: z.date({
      required_error: "A date is required.",
    }),
    payDate: z.string().min(2).max(50),
    company: z.string().min(2).max(50),
    jobType: z.string().min(2).max(50),
    value: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "",
      date: "",
      payDate: "",
      company: "",
      jobType: "",
      value: "",
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
    const { number, date, payDate, company, jobType, value } = values;
    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          number,
          date,
          payDate,
          company,
          jobType,
          value,
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
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number</FormLabel>
                            <FormControl>
                              <Input placeholder="NFS-e number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (<FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }

                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="payDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>payDate</FormLabel>
                            <FormControl>
                              <Input placeholder="NFS-e payday" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>company</FormLabel>
                            <FormControl>
                              <Input placeholder="company" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="jobType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type of Service Provided</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Type of Service Provided"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>valor</FormLabel>
                            <FormControl>
                              <Input placeholder="NFS-e value" {...field} />
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
