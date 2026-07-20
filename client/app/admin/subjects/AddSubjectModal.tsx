"use client";

import { useEffect, useState } from "react";

import { createSubject } from "@/services/subject";
import { getDepartments } from "@/services/department";

import { Department } from "@/types/department";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddSubjectModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [departments, setDepartments] = useState<Department[]>([]);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState(1);
  const [credits, setCredits] = useState(4);

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

      await createSubject({
        name,
        code,
        department,
        semester,
        credits,
        isActive: true,
      });

      setName("");
      setCode("");
      setDepartment("");
      setSemester(1);
      setCredits(4);

      onSuccess();
      onClose();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create subject.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-xl p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Add Subject
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">
              Subject Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3 text-gray-900"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">
              Subject Code
            </label>

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border rounded-lg p-3 text-gray-900"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">
              Department
            </label>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border rounded-lg p-3 text-gray-900"
              required
            >
              <option value="">
                Select Department
              </option>

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
              <label className="block mb-2 text-gray-700 font-medium">
                Semester
              </label>

              <select
                value={semester}
                onChange={(e) =>
                  setSemester(Number(e.target.value))
                }
                className="w-full border rounded-lg p-3 text-gray-900"
              >
                {[1,2,3,4,5,6,7,8].map((sem)=>(
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Credits
              </label>

              <input
                type="number"
                min={1}
                max={10}
                value={credits}
                onChange={(e)=>
                  setCredits(Number(e.target.value))
                }
                className="w-full border rounded-lg p-3 text-gray-900"
              />
            </div>

          </div>

          <div className="flex justify-end gap-4 mt-8">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              {loading ? "Saving..." : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}