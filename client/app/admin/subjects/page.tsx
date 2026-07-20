"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import SubjectTable from "./SubjectTable";
import AddSubjectModal from "./AddSubjectModal";

import { getSubjects } from "@/services/subject";
import { Subject } from "@/types/subject";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      setLoading(true);

      const res = await getSubjects();

      setSubjects(res.subjects);
    } catch (error) {
      console.error(error);
      alert("Failed to load subjects.");
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
              Subjects
            </h1>

            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Subject
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <SubjectTable subjects={subjects} />
          )}
        </div>
      </div>

      <AddSubjectModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadSubjects}
      />
    </div>
  );
}