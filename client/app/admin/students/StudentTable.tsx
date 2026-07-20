"use client";

import { Student } from "@/types/student";

interface Props {
  students: Student[];
}

export default function StudentTable({ students }: Props) {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No students found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Enrollment No</th>
            <th className="p-4 text-center">Roll No</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Gender</th>
            <th className="p-4 text-left">Class</th>
            <th className="p-4 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student._id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-4 font-medium">
                {student.name}
              </td>

              <td className="p-4">
                {student.enrollmentNo}
              </td>

              <td className="p-4 text-center">
                {student.rollNo}
              </td>

              <td className="p-4">
                {student.email}
              </td>

              <td className="p-4">
                {student.phone || "-"}
              </td>

              <td className="p-4">
                {student.gender}
              </td>

              <td className="p-4">
                {typeof student.class === "object"
                  ? student.class.name
                  : student.class}
              </td>

              <td className="p-4 text-center">
                {student.isActive ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    Active
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                    Inactive
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}