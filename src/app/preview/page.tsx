"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function PreviewPage() {
  const [generatedCode, setGeneratedCode] = useState("");
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const code = localStorage.getItem("generatedCode") || "";
    setGeneratedCode(code);
  }, []);

  useEffect(() => {
    if (!generatedCode) {
      setBlobUrl(null);
      return;
    }

    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
    }

    const blob = new Blob([generatedCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [generatedCode, refreshKey]);

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
          padding: 20,
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            No App Found
          </h1>
          <p style={{ fontSize: "1.1rem" }}>
            Please generate an app first from the{" "}
            <Link
              href="/"
              style={{ color: "#2563eb", textDecoration: "underline" }}
            >
              main site
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  // فتح التطبيق في نافذة جديدة باستخدام Blob URL
  const openInNewTab = () => {
    if (blobUrl) {
      window.open(blobUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* iframe العرض */}
      {blobUrl && (
        <iframe
          key={refreshKey}
          ref={iframeRef}
          src={blobUrl}
          title="Generated App Preview"
          sandbox="allow-scripts allow-forms allow-modals allow-popups allow-same-origin"
          style={{
            flex: 1,
            width: "100%",
            border: "none",
            margin: 0,
            padding: 0,
            display: "block",
          }}
        />
      )}

      {/* أزرار التحكم */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          right: 20,
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          zIndex: 1000,
        }}
      >
        <Link
          href="/"
          style={{
            backgroundColor: "rgba(255 255 255 / 0.4)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255 255 255 / 0.3)",
            color: "#000",
            fontWeight: "700",
            fontSize: "1rem",
            padding: "0.5rem 1.2rem",
            borderRadius: 8,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            userSelect: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "rgba(255 255 255 / 0.7)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "rgba(255 255 255 / 0.4)";
          }}
          title="Back to Main Site"
        >
          الرجوع
        </Link>
      </div>
    </div>
  );
}
