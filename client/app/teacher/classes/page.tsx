"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getMyClasses } from "@/services/teacherClass";
import { TeacherClass } from "@/types/teacherClass";

import {
  FaUsers,
  FaBook,
  FaGraduationCap,
} from "react-icons/fa";

export default function TeacherClassesPage() {
  const router = useRouter();

  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const res = await getMyClasses();
      setClasses(res.classes);
    } catch (error) {
      console.error(error);
      alert("Failed to load assigned classes.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (classes.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-2xl font-semibold mb-3">
          No Classes Assigned
        </h2>

        <p className="text-gray-500">
          Contact the administrator to assign classes.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        My Classes
      </h1>

      <div className="grid gap-6">

        {classes.map((item) => (

          <div
            key={item._id}
            className="bg-white rounded-xl shadow p-6"
          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold">
                  {item.class.name} - {item.class.section}
                </h2>

                <p className="text-gray-600 mt-2">
                  {item.class.department.name}
                </p>

              </div>

              <button
                onClick={() =>
                  router.push(
                    `/teacher/attendance?classId=${item.class._id}&subjectId=${item.subject._id}`
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Mark Attendance
              </button>

            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">

              <div className="flex items-center gap-3">

                <FaGraduationCap className="text-blue-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Semester
                  </p>

                  <p className="font-semibold">
                    {item.class.semester}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <FaBook className="text-green-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Subject
                  </p>

                  <p className="font-semibold">
                    {item.subject.name}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <FaUsers className="text-red-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Students
                  </p>

                  <p className="font-semibold">
                    {item.totalStudents}
                  </p>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>
    </>
  );
}