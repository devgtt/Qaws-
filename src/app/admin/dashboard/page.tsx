"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Activity,
  CreditCard,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  BarChart3,
  Download,
  UserCheck,
  Crown,
  Zap,
  Calendar,
  Filter,
} from "lucide-react";

// Mock data - replace with real API calls
const mockData = {
  totalUsers: 1247,
  activeUsers: 892,
  totalGenerations: 15463,
  revenue: 45780,
  subscriptions: {
    free: 1050,
    pro: 165,
    enterprise: 32,
  },
  recentGenerations: [
    {
      id: 1,
      user: "أحمد محمد",
      app: "تطبيق المتجر",
      time: "منذ 5 دقائق",
      status: "مكتمل",
    },
    {
      id: 2,
      user: "فاطمة علي",
      app: "تطبيق الصحة",
      time: "منذ 12 دقيقة",
      status: "قيد المعالجة",
    },
    {
      id: 3,
      user: "محمد سالم",
      app: "تطبيق التعليم",
      time: "منذ 23 دقيقة",
      status: "مكتمل",
    },
    {
      id: 4,
      user: "سارة أحمد",
      app: "تطبيق الطعام",
      time: "منذ 35 دقيقة",
      status: "مكتمل",
    },
  ],
  monthlyStats: [
    { month: "يناير", generations: 1200, users: 450 },
    { month: "فبراير", generations: 1450, users: 520 },
    { month: "مارس", generations: 1680, users: 640 },
    { month: "أبريل", generations: 1920, users: 720 },
    { month: "مايو", generations: 2150, users: 850 },
    { month: "يونيو", generations: 2350, users: 920 },
  ],
};

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeFilter, setTimeFilter] = useState("week");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  interface StatCardProps {
    title: string;
    value: string;
    change?: number;
    icon: React.ComponentType<{ className?: string }>;
    color?: string;
  }

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    color = "blue",
  }: StatCardProps) => (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm arabic-text mb-2">{title}</p>
          <p className="text-3xl font-bold text-white arabic-text">{value}</p>
          {change && (
            <p
              className={`text-sm mt-2 arabic-text ${
                change > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {change > 0 ? "+" : ""}
              {change}% من الشهر الماضي
            </p>
          )}
        </div>
        <div
          className={`p-4 rounded-xl bg-gradient-to-br from-${color}-500/20 to-${color}-600/20 border border-${color}-400/30`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 via-orange-400 to-pink-500">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-black/20 backdrop-blur-xl border-l border-white/10 z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold arabic-text">
                  لوحة الإدارة
                </h2>
                <p className="text-white/60 text-sm arabic-text">روزيت</p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {[
              { id: "overview", label: "نظرة عامة", icon: BarChart3 },
              { id: "users", label: "إدارة المستخدمين", icon: Users },
              { id: "subscriptions", label: "الاشتراكات", icon: CreditCard },
              { id: "analytics", label: "التحليلات", icon: TrendingUp },
              { id: "settings", label: "الإعدادات", icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 arabic-text ${
                  activeTab === item.id
                    ? "bg-white/20 text-white border border-white/30"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-blue-600/20 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium arabic-text">
                  أحمد المدير
                </p>
                <p className="text-white/60 text-sm arabic-text">مدير النظام</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:mr-80 min-h-screen">
        {/* Top Header */}
        <header className="bg-white/5 backdrop-blur-md border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-white arabic-text">
                {activeTab === "overview" && "نظرة عامة"}
                {activeTab === "users" && "إدارة المستخدمين"}
                {activeTab === "subscriptions" && "الاشتراكات"}
                {activeTab === "analytics" && "التحليلات"}
                {activeTab === "settings" && "الإعدادات"}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden sm:block">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <input
                  type="text"
                  placeholder="البحث..."
                  className="bg-white/10 border border-white/20 rounded-xl px-10 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 arabic-text text-right"
                />
              </div>

              {/* Notifications */}
              <button className="p-3 text-white hover:bg-white/10 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </button>

              {/* Time Filter */}
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 arabic-text"
              >
                <option value="day">اليوم</option>
                <option value="week">هذا الأسبوع</option>
                <option value="month">هذا الشهر</option>
                <option value="year">هذا العام</option>
              </select>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="إجمالي المستخدمين"
                  value={mockData.totalUsers.toLocaleString()}
                  change={12}
                  icon={Users}
                  color="blue"
                />
                <StatCard
                  title="المستخدمين النشطين"
                  value={mockData.activeUsers.toLocaleString()}
                  change={8}
                  icon={Activity}
                  color="green"
                />
                <StatCard
                  title="التطبيقات المُولدة"
                  value={mockData.totalGenerations.toLocaleString()}
                  change={23}
                  icon={Zap}
                  color="purple"
                />
                <StatCard
                  title="الإيرادات (ريال)"
                  value={mockData.revenue.toLocaleString()}
                  change={15}
                  icon={TrendingUp}
                  color="orange"
                />
              </div>

              {/* Charts and Tables Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Subscription Distribution */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white arabic-text mb-6">
                    توزيع الاشتراكات
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        <span className="text-white arabic-text">مجاني</span>
                      </div>
                      <span className="text-white font-bold">
                        {mockData.subscriptions.free}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                        <span className="text-white arabic-text">احترافي</span>
                      </div>
                      <span className="text-white font-bold">
                        {mockData.subscriptions.pro}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                        <span className="text-white arabic-text">مؤسسي</span>
                      </div>
                      <span className="text-white font-bold">
                        {mockData.subscriptions.enterprise}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent Generations */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white arabic-text">
                      التطبيقات المُولدة مؤخراً
                    </h3>
                    <button className="text-blue-300 hover:text-blue-200 text-sm arabic-text">
                      عرض الكل
                    </button>
                  </div>
                  <div className="space-y-4">
                    {mockData.recentGenerations.map((gen) => (
                      <div
                        key={gen.id}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                      >
                        <div>
                          <p className="text-white font-medium arabic-text">
                            {gen.app}
                          </p>
                          <p className="text-white/60 text-sm arabic-text">
                            {gen.user} • {gen.time}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs arabic-text ${
                            gen.status === "مكتمل"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          {gen.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monthly Trends */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white arabic-text">
                    الاتجاهات الشهرية
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors arabic-text">
                    <Download className="w-4 h-4" />
                    تصدير
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {mockData.monthlyStats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-white/5 rounded-xl"
                    >
                      <p className="text-white/70 text-sm arabic-text mb-2">
                        {stat.month}
                      </p>
                      <p className="text-2xl font-bold text-white">
                        {stat.generations}
                      </p>
                      <p className="text-white/60 text-xs arabic-text">تطبيق</p>
                      <div className="mt-2 h-2 bg-white/10 rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                          style={{
                            width: `${(stat.generations / 2500) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white arabic-text">
                  إدارة المستخدمين
                </h2>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl arabic-text hover:from-blue-600 hover:to-purple-700 transition-all">
                  إضافة مستخدم جديد
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="البحث عن المستخدمين..."
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 arabic-text text-right"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors arabic-text">
                      <Filter className="w-4 h-4" />
                      تصفية
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-right p-4 text-white/80 arabic-text">
                          المستخدم
                        </th>
                        <th className="text-right p-4 text-white/80 arabic-text">
                          الاشتراك
                        </th>
                        <th className="text-right p-4 text-white/80 arabic-text">
                          التطبيقات
                        </th>
                        <th className="text-right p-4 text-white/80 arabic-text">
                          آخر نشاط
                        </th>
                        <th className="text-right p-4 text-white/80 arabic-text">
                          الحالة
                        </th>
                        <th className="text-right p-4 text-white/80 arabic-text">
                          الإجراءات
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "أحمد محمد",
                          email: "ahmed@example.com",
                          subscription: "احترافي",
                          apps: 15,
                          lastActive: "منذ ساعة",
                          status: "نشط",
                        },
                        {
                          name: "فاطمة علي",
                          email: "fatima@example.com",
                          subscription: "مجاني",
                          apps: 5,
                          lastActive: "منذ يوم",
                          status: "نشط",
                        },
                        {
                          name: "محمد سالم",
                          email: "mohammed@example.com",
                          subscription: "مؤسسي",
                          apps: 45,
                          lastActive: "منذ 3 ساعات",
                          status: "نشط",
                        },
                      ].map((user, index) => (
                        <tr
                          key={index}
                          className="border-t border-white/10 hover:bg-white/5"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-white font-medium arabic-text">
                                  {user.name}
                                </p>
                                <p className="text-white/60 text-sm">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs arabic-text ${
                                user.subscription === "مؤسسي"
                                  ? "bg-purple-500/20 text-purple-300"
                                  : user.subscription === "احترافي"
                                  ? "bg-blue-500/20 text-blue-300"
                                  : "bg-gray-500/20 text-gray-300"
                              }`}
                            >
                              {user.subscription}
                            </span>
                          </td>
                          <td className="p-4 text-white arabic-text">
                            {user.apps}
                          </td>
                          <td className="p-4 text-white/70 arabic-text">
                            {user.lastActive}
                          </td>
                          <td className="p-4">
                            <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-300 arabic-text">
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <button className="text-blue-300 hover:text-blue-200 arabic-text">
                              تحرير
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Add other tab contents here */}
        </main>
      </div>
    </div>
  );
}
