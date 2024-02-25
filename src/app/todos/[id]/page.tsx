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
import { DataTable } from "@/components/items/data-table";
import { columns } from "@/components/items/columns";
import { Input } from "@/components/ui/input";

const Todos = ({
    params: { id },
}: {
    params: { id: string; }
}) => {
    const [open, setOpen] = useState(false);
    const formSchema = z.object({
        text: z.string(({
            required_error: "text is required",
            invalid_type_error: "text must be a string",
        })),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    });

    const session = useSession();

    const router = useRouter();

    const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

    const { data, mutate, error, isLoading } = useSWR(
        `/api/todos/${id}`,
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
        console.log(data._id)

        console.log(text)
        try {
            await fetch(`/api/todos/${data._id}`, {
                method: "POST",
                body: JSON.stringify({
                    check: false,
                    text,
                    date: Date.now(),
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

                        <Form {...form}>
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger>
                                    <div className="p-5 bg-[#e8505b] rounded text-white font-bold">
                                        Crie uma tarefa
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-8"
                                    >
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

                                        </DialogHeader>

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
                                </DialogContent>
                            </Dialog>
                        </Form>
                    </div>
                    <div>
                        {isLoading ? (
                            "loading"
                        ) : (
                            <DataTable columns={columns} data={data?.todos || []} mutate={mutate} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default Todos;
