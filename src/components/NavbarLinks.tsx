"use client";

import { NavigatationLinks } from "@/utils/constants/NavbarLinks";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavbarLinks = () => {
  const [isCodeGenerated, setIsCodeGenerated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("generatedCode")) {
      setIsCodeGenerated(true);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-3 lg:gap-4">
        {NavigatationLinks.map((link) => (
          <Link
            href={link.href}
            key={link.label}
            className="group relative flex items-center gap-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 text-white px-5 py-2.5 rounded-xl font-medium arabic-text text-sm lg:text-base hover:from-white/20 hover:to-white/10 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">{link.label}</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden relative z-50 p-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 group"
        aria-label="فتح القائمة"
      >
        <div className="flex flex-col space-y-1.5 w-6 h-6 justify-center">
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 group-hover:bg-blue-400 ${
              isSidebarOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 group-hover:bg-blue-400 ${
              isSidebarOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 group-hover:bg-blue-400 ${
              isSidebarOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </div>
      </button>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed top-0 right-0 h-screen w-96 max-w-[85vw] bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 transform transition-all duration-500 ease-out shadow-2xl ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-black/80 to-black/95 pointer-events-none"></div>

        <div className="relative flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-white/2">
            <div className="flex items-center gap-4">
              <div className="relative p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/20 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white arabic-text bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  القائمة الرئيسية
                </span>
                <span className="text-sm text-gray-400 arabic-text">
                  روزيت - مولد التطبيقات
                </span>
              </div>
            </div>
            <button
              onClick={closeSidebar}
              className="p-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-110 group"
            >
              <svg
                className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 px-6 py-8 space-y-8 overflow-y-auto">
            {/* Primary Navigation */}
            <div className="space-y-4">
              <div className="text-gray-300 text-sm font-medium arabic-text mb-6 flex items-center gap-2">
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                التنقل الرئيسي
              </div>

              {NavigatationLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeSidebar}
                  className="w-full group relative flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-sm border border-white/10 text-white rounded-2xl font-medium arabic-text text-lg hover:from-white/15 hover:to-white/8 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="p-3 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 group-hover:from-white/20 group-hover:to-white/10 group-hover:border-white/20 transition-all duration-300">
                    <link.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="relative z-10 font-semibold">
                    {link.label}
                  </span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarLinks;
