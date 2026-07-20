"use client";

import { TeacherAssignment } from "@/types/teacherAssignment";

interface Props {
  assignments: TeacherAssignment[];
}

export default function AssignmentTable({
  assignments,
}: Props) {
  if (assignments.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No teacher assignments found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Teacher</th>
            <th className="p-4 text-left">Employee ID</th>
            <th className="p-4 text-left">Class</th>
            <th className="p-4 text-left">Subject</th>
            <th className="p-4 text-left">Semester</th>
            <th className="p-4 text-left">Academic Year</th>
          </tr>
        </thead>

        <tbody>
          {assignments.map((assignment) => (
            <tr
              key={assignment._id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-4">
                {assignment.teacher.name}
              </td>

              <td className="p-4">
                {assignment.teacher.employeeId}
              </td>

              <td className="p-4">
                {assignment.class.name} - {assignment.class.section}
              </td>

              <td className="p-4">
                {assignment.subject.name}
              </td>

              <td className="p-4">
                {assignment.semester}
              </td>

              <td className="p-4">
                {assignment.academicYear}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}