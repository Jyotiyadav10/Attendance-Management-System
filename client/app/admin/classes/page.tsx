"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import ClassTable from "./ClassTable";
import AddClassModal from "./AddClassModal";

import { getClasses } from "@/services/class";
import { Class } from "@/types/class";

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      setLoading(true);

      const res = await getClasses();

      setClasses(res.classes);
    } catch (error) {
      console.error(error);
      alert("Failed to load classes.");
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
              Classes
            </h1>

            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Class
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <ClassTable classes={classes} />
          )}
        </div>
      </div>

      <AddClassModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadClasses}
      />
    </div>
  );
}