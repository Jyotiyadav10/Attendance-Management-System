"use client";

import { Class } from "@/types/class";
import { Subject } from "@/types/subject";

interface Props {
  classes: Class[];
  subjects: Subject[];

  classId: string;
  subjectId: string;
  date: string;

  setClassId: (value: string) => void;
  setSubjectId: (value: string) => void;
  setDate: (value: string) => void;

  onLoadStudents: () => void;
}

export default function AttendanceFilter({
  classes,
  subjects,
  classId,
  subjectId,
  date,
  setClassId,
  setSubjectId,
  setDate,
  onLoadStudents,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <div className="grid grid-cols-4 gap-4">

        <div>
          <label className="block mb-2 font-medium">
            Class
          </label>

          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Class</option>

            {classes.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name} - {item.section}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Subject
          </label>

          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Subject</option>

            {subjects.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={onLoadStudents}
            className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
          >
            Load Students
          </button>
        </div>

      </div>
    </div>
  );
}