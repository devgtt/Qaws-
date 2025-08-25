import Navbar from "@/components/Navbar";
import GenerateCodeForm from "@/components/GenerateCodeForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 via-orange-400 to-pink-500 flex flex-col">
        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center gap-10 p-4">
          <section className="flex flex-col items-center gap-4 mt-8">
            <h1 className="text-white text-5xl font-extrabold arabic-text text-center drop-shadow-lg">
              حوّل فكرتك إلى تطبيق في دقائق
            </h1>
            <p className="text-xl text-white/90 arabic-text max-w-2xl text-center drop-shadow">الانشاء يستغرق ٣ دقائق واكثر
            </p>
          </section>
          <GenerateCodeForm />
        </main>

        {/* Footer */}
        <footer className="text-center text-gray-500 py-4 arabic-text text-sm mt-auto">
          © {new Date().getFullYear()} روزيت. جميع الحقوق محفوظة.
        </footer>
      </div>
    </>
  );
}
