import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavbarLinks from "./NavbarLinks";
import { createClient } from "@/utils/supabase/server";

const Navbar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-black/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/globe.svg" alt="شعار" width={32} height={32} />
          <span className="text-2xl font-bold text-white arabic-text">
            روزيت
          </span>
        </Link>
      </div>
      <NavbarLinks user={user} />
    </header>
  );
};

export default Navbar;
