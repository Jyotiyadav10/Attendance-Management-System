"use client";

import { Subject } from "@/types/subject";

interface Props {
  subjects: Subject[];
}

export default function SubjectTable({ subjects }: Props) {
  if (subjects.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No subjects found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Subject</th>
            <th className="p-4 text-left">Code</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-center">Semester</th>
            <th className="p-4 text-center">Credits</th>
            <th className="p-4 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((subject) => (
            <tr
              key={subject._id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-4 font-medium">
                {subject.name}
              </td>

              <td className="p-4">
                {subject.code}
              </td>

              <td className="p-4">
                {typeof subject.department === "object"
                  ? subject.department.name
                  : subject.department}
              </td>

              <td className="p-4 text-center">
                {subject.semester}
              </td>

              <td className="p-4 text-center">
                {subject.credits}
              </td>

              <td className="p-4 text-center">
                {subject.isActive ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
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