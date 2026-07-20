"use client";

import { useEffect, useState } from "react";

import { getDepartments } from "@/services/department";
import { createClass } from "@/services/class";

import { Department } from "@/types/department";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddClassModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [departments, setDepartments] = useState<Department[]>([]);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState(1);
  const [section, setSection] = useState("");
  const [academicYear, setAcademicYear] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadDepartments();
    }
  }, [open]);

  const loadDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.departments);
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createClass({
        name,
        department,
        semester,
        section,
        academicYear,
      });

      setName("");
      setDepartment("");
      setSemester(1);
      setSection("");
      setAcademicYear("");

      onSuccess();
      onClose();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create class.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-2xl">

        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Add Class
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-700">
              Class Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border p-3 text-gray-900"
              placeholder="B.Tech IT"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-700">
              Department
            </label>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full rounded-lg border p-3 text-gray-900"
              required
            >
              <option value="">Select Department</option>

              {departments.map((dept) => (
                <option
                  key={dept._id}
                  value={dept._id}
                >
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Semester
              </label>

              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full rounded-lg border p-3 text-gray-900"
              >
                {[1,2,3,4,5,6,7,8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Section
              </label>

              <input
                type="text"
                value={section}
                onChange={(e) =>
                  setSection(e.target.value.toUpperCase())
                }
                className="w-full rounded-lg border p-3 text-gray-900"
                placeholder="A"
                required
              />
            </div>

          </div>

          <div className="mt-4">
            <label className="mb-2 block font-medium text-gray-700">
              Academic Year
            </label>

            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full rounded-lg border p-3 text-gray-900"
              placeholder="2026-2027"
              required
            />
          </div>

          <div className="mt-8 flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}