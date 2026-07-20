"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AddDepartmentModal from "@/components/AddDepartmentModal";

import { getDepartments } from "@/services/department";
import { Department } from "@/types/department";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);

      const res = await getDepartments();

      setDepartments(res.departments);
    } catch (error) {
      console.error("Failed to fetch departments", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-3xl font-bold">
              Departments
            </h1>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              + Add Department
            </button>

          </div>

          {loading ? (
            <div className="text-center py-10">
              Loading...
            </div>
          ) : departments.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center">
              No departments found.
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow overflow-hidden">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>
                    <th className="p-4 text-left">Department</th>
                    <th className="p-4 text-left">Code</th>
                    <th className="p-4 text-left">Description</th>
                    <th className="p-4 text-center">Status</th>
                  </tr>

                </thead>

                <tbody>

                  {departments.map((department) => (

                    <tr
                      key={department._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium">
                        {department.name}
                      </td>

                      <td className="p-4">
                        {department.code}
                      </td>

                      <td className="p-4">
                        {department.description}
                      </td>

                      <td className="p-4 text-center">
                        {department.isActive ? (
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
          )}

        </div>

      </div>

      <AddDepartmentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={loadDepartments}
      />

    </div>
  );
}