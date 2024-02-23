"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "To-do Lists",
    url: "/todos",
  },
];

const Navbar = () => {
  const session = useSession();

  return (
    <div className="h-[100px] flex justify-between items-center px-4">
      <Link href="/" className="font-bold text-2xl">
        To-do list
      </Link>
      <div className="flex items-center gap-4">
        {links.map((link) => (
          <Link key={link.id} href={link.url} className="text-xl">
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" && (
          <button
            className="px-2 py-1 bg-[#e8505b] text-white rounded cursor-pointer"
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
