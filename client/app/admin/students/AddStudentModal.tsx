"use client";

import { useEffect, useState } from "react";

import { createStudent } from "@/services/student";
import { getClasses } from "@/services/class";

import { Class } from "@/types/class";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddStudentModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [classes, setClasses] = useState<Class[]>([]);

  const [name, setName] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [rollNo, setRollNo] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");
  const [classId, setClassId] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadClasses();
    }
  }, [open]);

  const loadClasses = async () => {
    try {
      const res = await getClasses();
      setClasses(res.classes);
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createStudent({
        name,
        enrollmentNo,
        rollNo,
        email,
        phone,
        gender,
        class: classId,
      });

      setName("");
      setEnrollmentNo("");
      setRollNo(1);
      setEmail("");
      setPhone("");
      setGender("Male");
      setClassId("");

      onSuccess();
      onClose();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-2xl">

        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Add Student
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                className="w-full rounded-lg border p-3 text-gray-900"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Enrollment No
              </label>

              <input
                type="text"
                className="w-full rounded-lg border p-3 text-gray-900"
                value={enrollmentNo}
                onChange={(e) => setEnrollmentNo(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Roll No
              </label>

              <input
                type="number"
                className="w-full rounded-lg border p-3 text-gray-900"
                value={rollNo}
                onChange={(e) => setRollNo(Number(e.target.value))}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                className="w-full rounded-lg border p-3 text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Phone
              </label>

              <input
                type="text"
                className="w-full rounded-lg border p-3 text-gray-900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Gender
              </label>

              <select
                className="w-full rounded-lg border p-3 text-gray-900"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

          </div>

          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-700">
              Class
            </label>

            <select
              className="w-full rounded-lg border p-3 text-gray-900"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              required
            >
              <option value="">Select Class</option>

              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name} - Semester {cls.semester} - Section {cls.section}
                </option>
              ))}
            </select>
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