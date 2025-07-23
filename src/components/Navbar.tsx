import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavbarLinks from "./NavbarLinks";
const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-black/50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/globe.svg" alt="شعار" width={32} height={32} />
          <span className="text-2xl font-bold text-white arabic-text">
            روزيت
          </span>
        </Link>
      </div>
      <NavbarLinks />
    </header>
  );
};

export default Navbar;
