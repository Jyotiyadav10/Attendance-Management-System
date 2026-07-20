"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import StudentTable from "./StudentTable";
import AddStudentModal from "./AddStudentModal";

import { getStudents } from "@/services/student";
import { Student } from "@/types/student";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const res = await getStudents();

      setStudents(res.students);
    } catch (error) {
      console.error(error);
      alert("Failed to load students.");
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
              Students
            </h1>

            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Student
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <StudentTable students={students} />
          )}
        </div>
      </div>

      <AddStudentModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadStudents}
      />
    </div>
  );
}