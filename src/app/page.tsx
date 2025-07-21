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

  // عند الإنشاء، انتقل مباشرة إلى صفحة المعاينة مع تمرير الوصف
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const enhancedPrompt = `أنشئ تطبيق ويب HTML كامل بناءً على هذا الوصف: "${description}". 
      يجب أن يحتوي على HTML, CSS, و JavaScript في ملف واحد. 
      اجعل التصميم جميل وحديث مع ألوان جذابة.
      ابدأ الكود مباشرة بـ <!DOCTYPE html> ولا تضع أي نص قبله أو بعده.`;

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
    <div className="min-h-screen bg-gradient-to-br from-[#181830] to-[#232347] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-opacity-80 bg-[#181830]">
        <div className="flex items-center gap-2">
          <Image src="/globe.svg" alt="شعار" width={32} height={32} />
          <span className="text-2xl font-bold gradient-text arabic-text">
            روزيت
          </span>
        </div>
        <button className="btn-primary px-5 py-2 rounded-lg font-bold arabic-text text-base">
          تسجيل الدخول
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center gap-10 p-4">
        <section className="flex flex-col items-center gap-4 mt-8">
          <h1 className="gradient-text text-5xl font-extrabold arabic-text text-center">
            حوّل فكرتك إلى تطبيق في دقائق
          </h1>
          <p className="text-xl text-gray-300 arabic-text max-w-2xl text-center">
            اكتب وصفاً لما تريد بناءه، ودع الذكاء الاصطناعي ينشئ لك تطبيقاً
            كاملاً يمكنك تعديله أو نشره مباشرة.
          </p>
        </section>

        {/* App Generator Form */}
        <form
          onSubmit={handleSubmit}
          className="glass p-8 rounded-2xl flex flex-col gap-5 w-full max-w-xl shadow-2xl mt-4"
        >
          <label
            htmlFor="description"
            className="arabic-text font-semibold text-lg"
          >
            وصف التطبيق المطلوب
          </label>
          <textarea
            id="description"
            className="p-4 rounded-xl border border-gray-700 bg-[#181830] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 arabic-text min-h-[80px] resize-none"
            placeholder="مثال: أريد تطبيق لإدارة المهام مع إمكانية إضافة مهام وتصنيفها حسب الأولوية..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-center py-4 px-8 rounded-xl text-2xl font-bold arabic-text mt-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:shadow-2xl shadow-lg w-full flex justify-center"
            disabled={loading || !description.trim()}
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
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-4 arabic-text text-sm mt-auto">
        © {new Date().getFullYear()} روزيت. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
