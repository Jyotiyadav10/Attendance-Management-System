"use client";

import { useEffect, useState } from "react";

import { getTeachers } from "@/services/teacher";
import { getClasses } from "@/services/class";
import { getSubjects } from "@/services/subject";
import { assignTeacher } from "@/services/teacherAssignment";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AssignTeacherModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  const [teacher, setTeacher] = useState("");
  const [classId, setClassId] = useState("");
  const [subject, setSubject] = useState("");
  const [academicYear, setAcademicYear] = useState("2026-27");
  const [semester, setSemester] = useState(1);

  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open]);

  const loadData = async () => {
    try {
      const teacherRes = await getTeachers();
      const classRes = await getClasses();
      const subjectRes = await getSubjects();

      setTeachers(teacherRes.teachers);
      setClasses(classRes.classes);
      setSubjects(subjectRes.subjects);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await assignTeacher({
      teacher,
      class: classId,
      subject,
      academicYear,
      semester,
    });

    onSuccess();
    onClose();

    setTeacher("");
    setClassId("");
    setSubject("");
    setAcademicYear("2026-27");
    setSemester(1);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[600px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          Assign Teacher
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <select
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="w-full border rounded p-3"
            required
          >
            <option value="">Select Teacher</option>

            {teachers.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="w-full border rounded p-3"
            required
          >
            <option value="">Select Class</option>

            {classes.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name} - {item.section}
              </option>
            ))}
          </select>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded p-3"
            required
          >
            <option value="">Select Subject</option>

            {subjects.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            placeholder="Academic Year"
            className="w-full border rounded p-3"
            required
          />

          <input
            type="number"
            value={semester}
            onChange={(e) =>
              setSemester(Number(e.target.value))
            }
            placeholder="Semester"
            className="w-full border rounded p-3"
            required
          />

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
            >
              Assign
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}