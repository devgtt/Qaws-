import Navbar from "@/components/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 via-orange-400 to-pink-500">
      <Navbar />
      {children}
    </main>
  );
}
