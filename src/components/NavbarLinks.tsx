"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NavbarLinks = () => {
  const [isCodeGenerated, setIsCodeGenerated] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("generatedCode")) {
      setIsCodeGenerated(true);
    }
  }, []);
  return (
    <div className="flex items-center gap-2">
      <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2 rounded-lg font-bold arabic-text text-base hover:bg-white/30 transition-all">
        تسجيل الدخول
      </button>
      {isCodeGenerated && (
        <Link
          href={"/preview"}
          className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2 rounded-lg font-bold arabic-text text-base hover:bg-white/30 transition-all"
        >
          عرض التطبيق
        </Link>
      )}
    </div>
  );
};

export default NavbarLinks;
