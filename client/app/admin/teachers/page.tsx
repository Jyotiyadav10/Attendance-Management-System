"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import TeacherTable from "@/components/TeacherTable";
import AddTeacherModal from "@/components/AddTeacherModal";

import { getTeachers } from "@/services/teacher";
import { Teacher } from "@/types/teacher";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading(true);

      const res = await getTeachers();
      setTeachers(res.teachers);

    } catch (error) {
      console.error(error);
      alert("Failed to load teachers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8 text-gray-900">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-3xl font-bold">
              Teachers
            </h1>

            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Teacher
            </button>

          </div>

          {loading ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              Loading...
            </div>
          ) : (
            <TeacherTable teachers={teachers} />
          )}

          <AddTeacherModal
            open={open}
            onClose={() => setOpen(false)}
            onSuccess={loadTeachers}
          />

        </div>
      </div>
    </div>
  );
}