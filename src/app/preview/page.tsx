"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PreviewPage() {
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    // قراءة الكود المولد من localStorage
    const code = localStorage.getItem("generatedCode") || "";
    setGeneratedCode(code);
  }, []);

  // إذا لم يوجد كود، عرض رسالة بسيطة
  if (!generatedCode) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f5f5f5",
          color: "#333",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>No App Found</h1>
          <p>Please generate an app first from the main site.</p>
        </div>
      </div>
    );
  }

  // عرض الكود المولد فقط كموقع منفصل
  return (
    <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0 }}>
      <iframe
        srcDoc={generatedCode}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          margin: 0,
          padding: 0,
        }}
        sandbox="allow-scripts allow-forms allow-modals allow-popups allow-same-origin"
        title="Generated App"
      />
      {/* back button */}
      <Link
        href={"/"}
        className="bg-white/40 backdrop-blur-sm border border-white/30 text-white px-5 py-2 rounded-lg font-bold arabic-text text-base hover:bg-white/30 transition-all fixed bottom-10 right-10"
      >
        الرجوع
      </Link>
    </div>
  );
}
