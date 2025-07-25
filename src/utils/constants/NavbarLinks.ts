import { EyeIcon, LogInIcon, UserIcon } from "lucide-react";

export const NavigatationLinks = [
  {
    label: "عرض التطبيق",
    href: "/preview",
    icon: EyeIcon,
    showWhen: "always" as const,
  },
  {
    label: "تسجيل الدخول",
    href: "/auth/login",
    icon: LogInIcon,
    showWhen: "unauthenticated" as const,
  },
  {
    label: "الملف الشخصي",
    href: "/profile",
    icon: UserIcon,
    showWhen: "authenticated" as const,
  },
];
