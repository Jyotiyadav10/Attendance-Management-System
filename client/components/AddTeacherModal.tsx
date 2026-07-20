"use client";

import { useEffect, useState } from "react";
import { createTeacher } from "@/services/teacher";
import { getDepartments } from "@/services/department";

interface Department {
  _id: string;
  name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddTeacherModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [departments, setDepartments] = useState<Department[]>([]);

  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    gender: "Male",
    department: "",
    designation: "Assistant Professor",
    qualification: "",
    experience: 0,
  });

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res.departments);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createTeacher(form);

    onSuccess();
    onClose();

    setForm({
      name: "",
      employeeId: "",
      email: "",
      phone: "",
      gender: "Male",
      department: "",
      designation: "Assistant Professor",
      qualification: "",
      experience: 0,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[600px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          Add Teacher
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            placeholder="Teacher Name"
            className="w-full border p-3 rounded"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Employee ID"
            className="w-full border p-3 rounded"
            value={form.employeeId}
            onChange={(e) =>
              setForm({
                ...form,
                employeeId: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            placeholder="Phone"
            className="w-full border p-3 rounded"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <select
            className="w-full border p-3 rounded"
            value={form.gender}
            onChange={(e) =>
              setForm({
                ...form,
                gender: e.target.value,
              })
            }
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select
            className="w-full border p-3 rounded"
            value={form.department}
            onChange={(e) =>
              setForm({
                ...form,
                department: e.target.value,
              })
            }
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

          <input
            placeholder="Qualification"
            className="w-full border p-3 rounded"
            value={form.qualification}
            onChange={(e) =>
              setForm({
                ...form,
                qualification: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Experience"
            className="w-full border p-3 rounded"
            value={form.experience}
            onChange={(e) =>
              setForm({
                ...form,
                experience: Number(e.target.value),
              })
            }
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded"
            >
              Cancel
            </button>

            <button
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              Save
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}