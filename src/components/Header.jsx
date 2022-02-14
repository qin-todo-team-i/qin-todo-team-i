import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <div className="max-w-5xl mx-auto flex justify-between items-center h-20">
      <Link href="/">
        <a>
          <Image src="/logo.png" alt="logo" width={168} height={36} />
        </a>
      </Link>

      <Link href="#">
        <a>
          <Image src="/person.png" alt="logo" width={36} height={36} />
        </a>
      </Link>
    </div>
  );
};
