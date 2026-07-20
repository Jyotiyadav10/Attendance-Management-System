"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import AssignmentTable from "@/components/AssignmentTable";
import AssignTeacherModal from "@/components/AssignTeacherModal";

import { getAssignments } from "@/services/teacherAssignment";
import { TeacherAssignment } from "@/types/teacherAssignment";

export default function TeacherAssignmentsPage() {
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      setLoading(true);

      const res = await getAssignments();
      setAssignments(res.assignments);

    } catch (error) {
      console.error(error);
      alert("Failed to load assignments.");
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
              Teacher Assignments
            </h1>

            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              + Assign Teacher
            </button>

          </div>

          {loading ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              Loading...
            </div>
          ) : (
            <AssignmentTable assignments={assignments} />
          )}

          <AssignTeacherModal
            open={open}
            onClose={() => setOpen(false)}
            onSuccess={loadAssignments}
          />

        </div>
      </div>
    </div>
  );
}