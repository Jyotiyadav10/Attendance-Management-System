"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ReportCard from "@/components/ReportCard";

import { getDashboardReport } from "@/services/report";
import { DashboardReport } from "@/types/report";

import {
  FaUsers,
  FaUserTie,
  FaBook,
  FaSchool,
  FaClipboardCheck,
} from "react-icons/fa";

export default function ReportsPage() {
  const [report, setReport] = useState<DashboardReport>({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalSubjects: 0,
    totalAttendance: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const res = await getDashboardReport();
      setReport(res.report);
    } catch (error) {
      console.error(error);
      alert("Failed to load report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8 text-gray-900">
          <h1 className="text-3xl font-bold mb-8">
            Reports Dashboard
          </h1>

          {loading ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              Loading...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

                <ReportCard
                  title="Students"
                  value={report.totalStudents}
                  icon={FaUsers}
                  color="bg-blue-500"
                />

                <ReportCard
                  title="Teachers"
                  value={report.totalTeachers}
                  icon={FaUserTie}
                  color="bg-green-500"
                />

                <ReportCard
                  title="Classes"
                  value={report.totalClasses}
                  icon={FaSchool}
                  color="bg-purple-500"
                />

                <ReportCard
                  title="Subjects"
                  value={report.totalSubjects}
                  icon={FaBook}
                  color="bg-orange-500"
                />

                <ReportCard
                  title="Attendance"
                  value={report.totalAttendance}
                  icon={FaClipboardCheck}
                  color="bg-red-500"
                />

              </div>

              {/* Charts will be added here */}
              <div className="mt-10">
                <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
                  Charts Coming Next...
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}