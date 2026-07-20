"use client";

import { useEffect, useState } from "react";

import ReportCard from "@/components/ReportCard";

import {
  FaChalkboard,
  FaBook,
  FaClipboardCheck,
  FaCalendarDay,
} from "react-icons/fa";

import { getTeacherDashboard } from "@/services/teacherDashboard";
import { TeacherDashboard } from "@/types/teacherDashboard";

export default function TeacherDashboardPage() {
  const [dashboard, setDashboard] =
    useState<TeacherDashboard>({
      assignedClasses: 0,
      assignedSubjects: 0,
      attendanceRecords: 0,
    });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getTeacherDashboard();
      setDashboard(res.dashboard);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8">
        Loading...
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        Teacher Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <ReportCard
          title="Assigned Classes"
          value={dashboard.assignedClasses}
          icon={FaChalkboard}
          color="bg-blue-500"
        />

        <ReportCard
          title="Assigned Subjects"
          value={dashboard.assignedSubjects}
          icon={FaBook}
          color="bg-green-500"
        />

        <ReportCard
          title="Attendance Records"
          value={dashboard.attendanceRecords}
          icon={FaClipboardCheck}
          color="bg-red-500"
        />

        <ReportCard
          title="Today's Classes"
          value={dashboard.assignedClasses}
          icon={FaCalendarDay}
          color="bg-purple-500"
        />

      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-8">
        <h2 className="text-xl font-semibold mb-4">
          Welcome to the Teacher Portal
        </h2>

        <p className="text-gray-600">
          From here you can manage your assigned classes,
          mark attendance, view attendance history, and
          update your profile.
        </p>
      </div>
    </>
  );
}