"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const GenerateCodeForm = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [maxLength, setMaxLength] = useState(500);
  const minLength = 10;
  const router = useRouter();
  // عند الإنشاء، انتقل مباشرة إلى صفحة المعاينة مع تمرير الوصف
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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // استخراج الرد من API

      const aiText = response.data.candidates[0].content.parts[0].text;
      setResponseText(aiText);

      // استخراج الكود HTML من الرد
      const codeMatch =
        aiText.match(/```html\n([\s\S]*?)\n```/) ||
        aiText.match(/<!DOCTYPE html>[\s\S]*?<\/html>/);
      let generatedCode = "";
      if (codeMatch) {
        generatedCode = codeMatch[1] || codeMatch[0];
      } else {
        // إذا لم يكن هناك تنسيق markdown، استخدم الرد كاملاً كما هو
        generatedCode = aiText;
      }

      // حفظ الكود في localStorage والانتقال لصفحة المعاينة
      localStorage.setItem("generatedCode", generatedCode);
      localStorage.setItem("appDescription", description);
      localStorage.setItem("aiResponse", aiText);
      router.push("/preview");
    } catch (error) {
      Swal.fire({
        title: "حدث خطأ",
        text: `حدث خطأ أثناء إنشاء التطبيق , ${error}`,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* App Generator Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl flex flex-col gap-5 w-full max-w-xl shadow-2xl mt-4"
      >
        <label
          htmlFor="description"
          className="arabic-text font-semibold text-lg text-white"
        >
          وصف التطبيق المطلوب
        </label>
        <textarea
          id="description"
          className="p-4 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50 arabic-text min-h-[80px] resize-none placeholder-white/70"
          placeholder="مثال: أريد تطبيق لإدارة المهام مع إمكانية إضافة مهام وتصنيفها حسب الأولوية..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          maxLength={maxLength}
          minLength={minLength}
        />
        <p
          className={`text-sm arabic-text text-right ${
            description && description.length >= 10
              ? "text-green-500"
              : description.length === 0
              ? "text-white"
              : "text-red-500"
          }`}
        >
          {description.length}/{maxLength}
        </p>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-center py-4 px-8 rounded-xl text-2xl font-bold arabic-text mt-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:shadow-2xl shadow-lg w-full flex justify-center"
          disabled={loading || description.length < minLength}
        >
          {loading ? (
            <span className="loading-dots">
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
            </span>
          ) : (
            "توليد"
          )}
        </button>
      </form>

      {/* قسم عرض الرد */}
      {responseText && (
        <section className="glass p-6 rounded-xl flex flex-col items-center gap-3 w-full max-w-xl mt-6 shadow-lg animate-fade-in">
          <h2 className="text-2xl font-bold gradient-text arabic-text mb-2">
            رد الذكاء الاصطناعي
          </h2>
          <div className="arabic-text text-lg text-gray-200 text-center bg-[#232347] rounded-xl p-4 w-full border border-gray-700 whitespace-pre-line">
            {responseText}
          </div>
        </section>
      )}
    </>
  );
};

export default GenerateCodeForm;
