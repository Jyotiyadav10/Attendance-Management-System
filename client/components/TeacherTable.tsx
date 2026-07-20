"use client";

import { Teacher } from "@/types/teacher";

interface Props {
  teachers: Teacher[];
}

export default function TeacherTable({ teachers }: Props) {
  if (teachers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No teachers found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Employee ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-left">Designation</th>
            <th className="p-4 text-left">Experience</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((teacher) => (
            <tr
              key={teacher._id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-4">{teacher.employeeId}</td>

              <td className="p-4 font-medium">
                {teacher.name}
              </td>

              <td className="p-4">
                {teacher.email}
              </td>

              <td className="p-4">
                {teacher.department?.name}
              </td>

              <td className="p-4">
                {teacher.designation}
              </td>

              <td className="p-4">
                {teacher.experience} Years
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}