"use client";

import { ReactNode } from "react";

import TeacherSidebar from "@/components/TeacherSidebar";
import TeacherNavbar from "@/components/TeacherNavbar";

interface Props {
  children: ReactNode;
}

export default function TeacherLayout({
  children,
}: Props) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <TeacherSidebar />

      <div className="flex-1">
        <TeacherNavbar />

        <main className="p-8 text-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}