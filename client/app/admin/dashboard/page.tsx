"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";

import {
  getDashboardStats,
  DashboardStats,
} from "@/services/dashboard";

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    departments: 0,
    subjects: 0,
    classes: 0,
    students: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Dashboard
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <DashboardCard
                title="Departments"
                value={stats.departments}
              />

              <DashboardCard
                title="Subjects"
                value={stats.subjects}
              />

              <DashboardCard
                title="Classes"
                value={stats.classes}
              />

              <DashboardCard
                title="Students"
                value={stats.students}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}