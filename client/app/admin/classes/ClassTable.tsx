"use client";

import { Class } from "@/types/class";

interface Props {
  classes: Class[];
}

export default function ClassTable({ classes }: Props) {
  if (classes.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No classes found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Class</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-center">Semester</th>
            <th className="p-4 text-center">Section</th>
            <th className="p-4 text-left">Class Teacher</th>
            <th className="p-4 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {classes.map((item) => (
            <tr
              key={item._id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-4 font-medium">
                {item.name}
              </td>

              <td className="p-4">
                {typeof item.department === "object"
                  ? item.department.name
                  : item.department}
              </td>

              <td className="p-4 text-center">
                {item.semester}
              </td>

              <td className="p-4 text-center">
                {item.section}
              </td>

              

              <td className="p-4 text-center">
                {item.isActive ? (
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