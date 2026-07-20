"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  FaHome,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaHistory,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Dashboard",
    href: "/teacher/dashboard",
    icon: FaHome,
  },
  {
    title: "My Classes",
    href: "/teacher/classes",
    icon: FaChalkboardTeacher,
  },
  {
    title: "Attendance",
    href: "/teacher/attendance",
    icon: FaClipboardCheck,
  },
  {
    title: "Attendance History",
    href: "/teacher/history",
    icon: FaHistory,
  },
  {
    title: "Profile",
    href: "/teacher/profile",
    icon: FaUser,
  },
];

export default function TeacherSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Remove stored authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    router.push("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      <div className="h-16 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          Teacher Portal
        </h1>
      </div>

      <nav className="mt-5 flex-1">

        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 transition-all ${
                active
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={18} />
              <span>{item.title}</span>
            </Link>
          );
        })}

      </nav>

      <div className="border-t border-slate-700">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-600 transition-all"
        >
          <FaSignOutAlt size={18} />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}