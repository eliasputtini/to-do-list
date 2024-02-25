//@ts-nocheck
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/todos");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Circle-icons-dev.svg"
              className="mr-2"
              width={24}
              height={24}
              alt="dev"
            />
            Feito por eliasputtini
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Com organização e tempo, acha-se o segredo de fazer tudo
                e bem feito.&rdquo;
              </p>
              <footer className="text-sm">Pitagoras</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login
              </h1>
              <p className="text-sm text-muted-foreground">
                Please sign in to see the todos!
              </p>
            </div>
            <div className={cn("grid gap-6")}>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      required
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={session?.status === "loading"}
                    />
                    <Input
                      id="password"
                      placeholder="****************"
                      required
                      type="password"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={session?.status === "loading"}
                    />
                  </div>
                  <Button disabled={session?.status === "loading"}>
                    {session?.status === "loading" && (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="mr-2 h-4 w-4 animate-spin"
                      />
                    )}
                    Login
                  </Button>
                  <p className="text-sm text-muted-foreground text-right pt-2 italic">
                    {success ? success : "Welcome Back"}
                  </p>
                </div>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                type="button"
                disabled={session?.status === "loading"}
              >
                <Link href="/register">Create new account</Link>
              </Button>
            </div>
            <Button
              variant="outline"
              type="button"
              disabled={session?.status === "loading"}
              onClick={() => {
                signIn("credentials", {
                  email: 'teste@teste.com',
                  password: 'teste',
                });
              }}
            >
              Guest login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
