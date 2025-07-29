"use client";
import { createClient } from "@/utils/supabase/supabase-browser";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error, data } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });
      if (error) {
        return toast.error(error.message);
      }
      toast.success("تم إنشاء الحساب بنجاح يرجى التحقق من البريد الإلكتروني");
      // return modal to check email
      return (
        <div className="flex justify-center items-center">
          <h1>تم إنشاء الحساب بنجاح يرجى التحقق من البريد الإلكتروني</h1>
        </div>
      );
    } catch (error) {
      toast.error("حدث خطا ما يرجى المحاولة مجددا");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="block text-white/90 font-medium arabic-text"
          >
            الاسم الكامل
          </label>
          <div className="relative">
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50">
              <User className="w-5 h-5" />
            </div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 arabic-text text-right"
              placeholder="أدخل اسمك الكامل"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-white/90 font-medium arabic-text"
          >
            البريد الإلكتروني
          </label>
          <div className="relative">
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50">
              <Mail className="w-5 h-5" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 arabic-text text-right"
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-white/90 font-medium arabic-text"
          >
            كلمة المرور
          </label>
          <div className="relative">
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50">
              <Lock className="w-5 h-5" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 arabic-text text-right"
              placeholder="أدخل كلمة المرور"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-300"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-white/90 font-medium arabic-text"
          >
            تأكيد كلمة المرور
          </label>
          <div className="relative">
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50">
              <Lock className="w-5 h-5" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 arabic-text text-right"
              placeholder="أعد إدخال كلمة المرور"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-300"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-3">
          <input
            id="acceptTerms"
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-5 h-5 mt-1 bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-400/50"
          />
          <label
            htmlFor="acceptTerms"
            className="text-white/80 text-sm arabic-text"
          >
            أوافق على{" "}
            <Link
              href="/terms"
              className="text-blue-300 hover:text-blue-200 transition-colors duration-300"
            >
              شروط الخدمة
            </Link>{" "}
            و{" "}
            <Link
              href="/privacy"
              className="text-blue-300 hover:text-blue-200 transition-colors duration-300"
            >
              سياسة الخصوصية
            </Link>
          </label>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={isLoading || !acceptTerms}
          className="w-full bg-gradient-to-r flex justify-center items-center from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none arabic-text text-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              جاري إنشاء الحساب...
            </div>
          ) : (
            "إنشاء حساب جديد"
          )}
        </button>
      </form>
    </section>
  );
};

export default RegisterForm;
