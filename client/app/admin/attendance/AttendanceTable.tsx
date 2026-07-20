"use client";

import React from "react";

interface Student {
  _id: string;
  name: string;
  rollNo: number;
  enrollmentNo: string;
}

interface AttendanceItem {
  student: string;
  status: "Present" | "Absent";
}

interface Props {
  students?: Student[];
  attendance?: AttendanceItem[];
  setAttendance: React.Dispatch<
    React.SetStateAction<AttendanceItem[]>
  >;
  onSave: () => void;
}

export default function AttendanceTable({
  students = [],
  attendance = [],
  setAttendance,
  onSave,
}: Props) {
  const updateStatus = (
    studentId: string,
    status: "Present" | "Absent"
  ) => {
    setAttendance((prev) => {
      const existing = prev.find(
        (item) => item.student === studentId
      );

      if (existing) {
        return prev.map((item) =>
          item.student === studentId
            ? { ...item, status }
            : item
        );
      }

      return [...prev, { student: studentId, status }];
    });
  };

  if (!students.length) {
    return (
      <div className="rounded-xl bg-white p-8 shadow text-center text-gray-500">
        Select a class and click <strong>Load Students</strong>.
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Roll No</th>
            <th className="p-4 text-left">Enrollment No</th>
            <th className="p-4 text-left">Student Name</th>
            <th className="p-4 text-center">Present</th>
            <th className="p-4 text-center">Absent</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => {
            const current = attendance.find(
              (a) => a.student === student._id
            );

            return (
              <tr
                key={student._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">{student.rollNo}</td>

                <td className="p-4">
                  {student.enrollmentNo}
                </td>

                <td className="p-4 font-medium">
                  {student.name}
                </td>

                <td className="p-4 text-center">
                  <input
                    type="radio"
                    name={`attendance-${student._id}`}
                    checked={current?.status === "Present"}
                    onChange={() =>
                      updateStatus(student._id, "Present")
                    }
                  />
                </td>

                <td className="p-4 text-center">
                  <input
                    type="radio"
                    name={`attendance-${student._id}`}
                    checked={current?.status === "Absent"}
                    onChange={() =>
                      updateStatus(student._id, "Absent")
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-end border-t p-6">
        <button
          onClick={onSave}
          className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
}