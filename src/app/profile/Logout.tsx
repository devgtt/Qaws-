"use client";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { createClient } from "@/utils/supabase/supabase-browser";
import { redirect } from "next/navigation";
import React from "react";

const Logout = () => {
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/");
  };

  return (
    <div className="flex justify-center items-center mt-5">
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2"
      >
        تسجيل الخروج
      </button>
    </div>
  );
};

export default Logout;
