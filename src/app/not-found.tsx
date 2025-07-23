import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 via-orange-400 to-pink-500 flex items-center justify-center p-4">
      {/* Main content container */}
      <div className="max-w-2xl mx-auto text-center">
        {/* Large 404 number */}
        <h1 className="text-8xl md:text-9xl font-black text-white/80 mb-8">
          404
        </h1>

        {/* Glass morphism container for content */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl mb-8">
          {/* Main heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white arabic-text mb-4">
            الصفحة غير موجودة
          </h2>

          {/* Description */}
          <p className="text-lg text-white/90 arabic-text mb-8 leading-relaxed">
            عذراً، لا يمكن العثور على الصفحة التي تبحث عنها
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold arabic-text transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
