"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

export default function Home() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const router = useRouter();

  // When creating, go directly to preview page with description
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const enhancedPrompt = `Create a complete HTML web application based on this description: "${description}". 
      It should contain HTML, CSS, and JavaScript in one file. 
      Make the design beautiful and modern with attractive colors.
      Start the code directly with <!DOCTYPE html> and don't put any text before or after it.`;

      const body = {
        contents: [{ parts: [{ text: enhancedPrompt }] }],
      };

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Extract response from API

      const aiText = response.data.candidates[0].content.parts[0].text;
      setResponseText(aiText);

      // Extract HTML code from response
      const codeMatch =
        aiText.match(/```html\n([\s\S]*?)\n```/) ||
        aiText.match(/<!DOCTYPE html>[\s\S]*?<\/html>/);
      let generatedCode = "";
      if (codeMatch) {
        generatedCode = codeMatch[1] || codeMatch[0];
      } else {
        // If no markdown format, use the complete response as is
        generatedCode = aiText;
      }

      // Save code in localStorage and go to preview page
      localStorage.setItem("generatedCode", generatedCode);
      localStorage.setItem("appDescription", description);
      localStorage.setItem("aiResponse", aiText);
      router.push("/preview");
    } catch (error) {
      Swal.fire({
        title: "Error Occurred",
        text: `An error occurred while creating the app: ${error}`,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url(/background.JPG)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Image src="/globe.svg" alt="logo" width={32} height={32} />
          <span className="text-2xl font-bold text-white">Rosette</span>
        </div>
        <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2 rounded-lg font-bold text-base hover:bg-white/30 transition-all">
          Sign In
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center gap-10 p-4">
        <section className="flex flex-col items-center gap-4 mt-8">
          <h1 className="text-white text-5xl font-extrabold text-center drop-shadow-lg">
            Turn Your Idea Into an App in Minutes
          </h1>
          <p className="text-xl text-white/90 max-w-2xl text-center drop-shadow">
            Write a description of what you want to build, and let AI create a
            complete app that you can edit or deploy directly.
          </p>
        </section>

        {/* App Generator Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl flex flex-col gap-5 w-full max-w-xl shadow-2xl mt-4"
        >
          <label
            htmlFor="description"
            className="font-semibold text-lg text-white"
          >
            Describe Your App
          </label>
          <textarea
            id="description"
            className="p-4 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[80px] resize-none placeholder-white/70"
            placeholder="Example: I want a task management app with the ability to add tasks and categorize them by priority..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-center py-4 px-8 rounded-xl text-2xl font-bold mt-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:shadow-2xl shadow-lg w-full flex justify-center"
            disabled={loading || !description.trim()}
          >
            {loading ? (
              <span className="loading-dots">
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
              </span>
            ) : (
              "Generate"
            )}
          </button>
        </form>

        {/* Response Section */}
        {responseText && (
          <section className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl flex flex-col items-center gap-3 w-full max-w-xl mt-6 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-2">AI Response</h2>
            <div className="text-lg text-white/90 text-center bg-black/20 rounded-xl p-4 w-full border border-white/30 whitespace-pre-line">
              {responseText}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-white/70 py-4 text-sm mt-auto">
        © {new Date().getFullYear()} Rosette. All rights reserved.
      </footer>
    </div>
  );
}
