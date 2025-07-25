import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  User,
  Mail,
  Calendar,
  Edit3,
  Shield,
  Trash2,
  Save,
} from "lucide-react";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-8 max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-8 mt-8">
            <h1 className="text-4xl font-bold text-white arabic-text mb-4 drop-shadow-lg">
              الملف الشخصي
            </h1>
            <p className="text-white/80 arabic-text text-lg">
              إدارة معلوماتك الشخصية وإعدادات الحساب
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-32 h-32 mb-4">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full border-4 border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <User className="w-16 h-16 text-white" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>

                  <h2 className="text-2xl font-bold text-white arabic-text mb-2">
                    {user.user_metadata?.full_name || "المستخدم"}
                  </h2>
                </div>
                {/* Quick Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <span className="text-white/80 arabic-text">
                      معرف المستخدم
                    </span>
                    <span className="text-xs font-mono text-white/70">
                      {user.id.slice(0, 8)}...
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <span className="text-white/80 arabic-text">
                      حالة البريد الإلكتروني
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          user.user_metadata?.email_verified
                            ? "bg-green-400"
                            : "bg-red-400"
                        }`}
                      ></div>
                      <span className="text-sm text-white">
                        {user.user_metadata?.email_verified
                          ? "مؤكد"
                          : "غير مؤكد"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <span className="text-white/80 arabic-text">
                      حالة الهاتف
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          user.user_metadata?.phone_verified
                            ? "bg-green-400"
                            : "bg-red-400"
                        }`}
                      ></div>
                      <span className="text-sm text-white">
                        {user.user_metadata?.phone_verified
                          ? "مؤكد"
                          : "غير مؤكد"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <span className="text-white/80 arabic-text">
                      نوع الحساب
                    </span>
                    <span className="text-sm text-white">
                      {user.app_metadata?.provider === "email"
                        ? "بريد إلكتروني"
                        : "غير محدد"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <span className="text-white/80 arabic-text">
                      أيام العضوية
                    </span>
                    <span className="text-2xl font-bold text-white">
                      {Math.floor(
                        (new Date().getTime() -
                          new Date(user.created_at).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}
                    </span>
                  </div>
                </div>
                {/* Status Badge */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="flex flex-col">
                      <span className="text-green-200 arabic-text font-medium">
                        نشط الآن
                      </span>
                      <span className="text-green-300/70 arabic-text text-xs">
                        آخر تسجيل دخول:{" "}
                        {new Date(user.last_sign_in_at || "").toLocaleString(
                          "ar-SA",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center mt-5">
                  <button className="bg-gradient-to-r bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Information */}
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white arabic-text flex items-center gap-3">
                    <User className="w-6 h-6" />
                    المعلومات الشخصية
                  </h3>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    <span className="arabic-text">تعديل</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/80 arabic-text text-sm">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      value={user.user_metadata?.full_name || ""}
                      className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 arabic-text"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/80 arabic-text text-sm">
                      البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={user.email || ""}
                        className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white px-4 py-3 pr-12 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                        placeholder="example@domain.com"
                        dir="ltr"
                      />
                      <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/80 arabic-text text-sm">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={user.phone || ""}
                      className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="+966 50 000 0000"
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/80 arabic-text text-sm">
                      تاريخ الانضمام
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={new Date(user.created_at).toLocaleDateString(
                          "ar-SA"
                        )}
                        disabled
                        className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white/60 px-4 py-3 pr-12 rounded-xl cursor-not-allowed"
                      />
                      <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/80 arabic-text text-sm">
                      تاريخ تأكيد البريد
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={
                          user.email_confirmed_at
                            ? new Date(user.email_confirmed_at).toLocaleString(
                                "ar-SA"
                              )
                            : "غير مؤكد"
                        }
                        disabled
                        className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white/60 px-4 py-3 pr-12 rounded-xl cursor-not-allowed"
                      />
                      <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/80 arabic-text text-sm">
                      آخر تحديث للحساب
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={
                          user.updated_at
                            ? new Date(user.updated_at).toLocaleString("ar-SA")
                            : "غير متوفر"
                        }
                        disabled
                        className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white/60 px-4 py-3 pr-12 rounded-xl cursor-not-allowed"
                      />
                      <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <label className="text-white/80 arabic-text text-sm">
                    نبذة شخصية
                  </label>
                  <textarea
                    rows={4}
                    defaultValue="مرحباً! أنا أحمد الفيفي، انضممت إلى منصة روزيت مؤخراً وأنا متحمس جداً لاستكشاف إمكانيات الذكاء الاصطناعي في تطوير التطبيقات. هدفي هو تعلم كيفية إنشاء تطبيقات مبتكرة وعملية باستخدام هذه التقنيات المتطورة."
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 arabic-text resize-none"
                    placeholder="اكتب نبذة مختصرة عنك وعن اهتماماتك في التطوير..."
                  />
                </div>
              </div>

              {/* Security Information */}
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white arabic-text flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6" />
                  معلومات الأمان
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white arabic-text font-medium">
                          مزود الخدمة
                        </span>
                        <span className="text-blue-300 text-sm">
                          {user.app_metadata?.provider === "email"
                            ? "البريد الإلكتروني"
                            : "غير محدد"}
                        </span>
                      </div>
                      <p className="text-white/60 arabic-text text-sm">
                        طريقة تسجيل الدخول الأساسية
                      </p>
                    </div>

                    <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white arabic-text font-medium">
                          حالة التحقق
                        </span>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              user.user_metadata?.email_verified
                                ? "bg-green-400"
                                : "bg-orange-400"
                            }`}
                          ></div>
                          <span className="text-sm text-white">
                            {user.user_metadata?.email_verified
                              ? "مؤكد"
                              : "يحتاج تأكيد"}
                          </span>
                        </div>
                      </div>
                      <p className="text-white/60 arabic-text text-sm">
                        حالة تأكيد البريد الإلكتروني
                      </p>
                    </div>

                    <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white arabic-text font-medium">
                          نوع المستخدم
                        </span>
                        <span className="text-green-300 text-sm">
                          {user.is_anonymous ? "ضيف" : "مسجل"}
                        </span>
                      </div>
                      <p className="text-white/60 arabic-text text-sm">
                        حالة تسجيل الحساب
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white arabic-text font-medium">
                          حالة الحساب
                        </span>
                        <span className="text-green-300 text-sm">نشط</span>
                      </div>
                      <p className="text-white/60 arabic-text text-sm">
                        الحساب غير محظور أو محذوف
                      </p>
                    </div>

                    <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white arabic-text font-medium">
                          SSO
                        </span>
                        <span className="text-white/60 text-sm">
                          {user.is_sso_user ? "مفعل" : "غير مفعل"}
                        </span>
                      </div>
                      <p className="text-white/60 arabic-text text-sm">
                        تسجيل الدخول الموحد
                      </p>
                    </div>

                    <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white arabic-text font-medium">
                          الهاتف
                        </span>
                        <span className="text-orange-300 text-sm">
                          {user.phone ? "مضاف" : "غير مضاف"}
                        </span>
                      </div>
                      <p className="text-white/60 arabic-text text-sm">
                        حالة رقم الهاتف
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 arabic-text font-semibold">
                  <Save className="w-5 h-5" />
                  حفظ التغييرات
                </button>

                <button className="sm:w-auto bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 arabic-text font-semibold">
                  <Trash2 className="w-5 h-5" />
                  حذف الحساب
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
