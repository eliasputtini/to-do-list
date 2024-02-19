import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="h-16 flex justify-between items-center px-4">
      <div>©2024 eliasputtini. All rights reserved.</div>
      <div className="flex items-center gap-2">
        <Image
          src="/1.png"
          width={15}
          height={15}
          className="opacity-60 cursor-pointer"
          alt="Lama Dev Facebook Account"
        />
        <Image
          src="/2.png"
          width={15}
          height={15}
          className="opacity-60 cursor-pointer"
          alt="Lama Dev"
        />
        <Image
          src="/3.png"
          width={15}
          height={15}
          className="opacity-60 cursor-pointer"
          alt="Lama Dev"
        />
        <Image
          src="/4.png"
          width={15}
          height={15}
          className="opacity-60 cursor-pointer"
          alt="Lama Dev"
        />
      </div>
    </div>
  );
};

export default Footer;
