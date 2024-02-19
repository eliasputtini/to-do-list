"use client";
import Image from "next/image";
import Hero from "public/hero.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center gap-28">
      <div className="flex flex-1 flex-col gap-14">
        <h1 className="text-7xl">TO DO LIST</h1>
        <p className="text-2xl font-light">
        Transforme o caos em ordem,  se organize melhor com nosso Organizador de Tarefas
        </p>
        <Link href="/login">
          <Button> Crie uma lista! </Button>
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-14">
        <Image src={Hero} alt="" className="w-full h-[700px]" />
      </div>
    </div>
  );
}
