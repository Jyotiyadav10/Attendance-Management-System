"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaHome,
  FaBuilding,
  FaBook,
  FaUsers,
  FaUserTie,
  FaClipboardCheck,
  FaChartBar,
  FaCog,
  FaTasks,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: FaHome,
  },
  {
    title: "Departments",
    href: "/admin/departments",
    icon: FaBuilding,
  },
  {
    title: "Subjects",
    href: "/admin/subjects",
    icon: FaBook,
  },
  {
    title: "Classes",
    href: "/admin/classes",
    icon: FaBook,
  },
  {
    title: "Students",
    href: "/admin/students",
    icon: FaUsers,
  },
  {
    title: "Teachers",
    href: "/admin/teachers",
    icon: FaUserTie,
  },
  {
    title: "Teacher Assignments",
    href: "/admin/teacher-assignments",
    icon: FaTasks,
  },
  {
    title: "Attendance",
    href: "/admin/attendance",
    icon: FaClipboardCheck,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FaChartBar,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: FaCog,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">
      <div className="h-16 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          Attendance ERP
        </h1>
      </div>

      <nav className="mt-5">
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
    </aside>
  );
}