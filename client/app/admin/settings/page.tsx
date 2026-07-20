"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import {
  getSettings,
  updateSettings,
} from "@/services/setting";

import { Setting } from "@/types/setting";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting>({
    instituteName: "",
    instituteCode: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    logo: "",

    academicYear: "",
    currentSemester: 1,

    attendancePercentage: 75,

    attendanceStartTime: "09:00",
    attendanceEndTime: "10:00",

    allowAttendanceEdit: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await getSettings();
      setSettings(res.settings);
    } catch (error) {
      console.error(error);
      alert("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const save = async () => {
    try {
      setSaving(true);

      await updateSettings(settings);

      alert("Settings updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex bg-gray-100 min-h-screen">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <div className="p-8">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8 text-gray-900">

          <h1 className="text-3xl font-bold mb-8">
            System Settings
          </h1>

          <div className="bg-white rounded-xl shadow p-8 space-y-10">

            {/* Institute */}

            <div>

              <h2 className="text-xl font-semibold mb-6">
                Institute Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  name="instituteName"
                  placeholder="Institute Name"
                  value={settings.instituteName}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  name="instituteCode"
                  placeholder="Institute Code"
                  value={settings.instituteCode}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  name="phone"
                  placeholder="Phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  name="email"
                  placeholder="Email"
                  value={settings.email}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  name="website"
                  placeholder="Website"
                  value={settings.website}
                  onChange={handleChange}
                  className="border rounded-lg p-3 md:col-span-2"
                />

                <textarea
                  name="address"
                  placeholder="Address"
                  value={settings.address}
                  onChange={handleChange}
                  rows={3}
                  className="border rounded-lg p-3 md:col-span-2"
                />

              </div>

            </div>

            {/* Academic */}

            <div>

              <h2 className="text-xl font-semibold mb-6">
                Academic Settings
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  name="academicYear"
                  placeholder="Academic Year"
                  value={settings.academicYear}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  type="number"
                  name="currentSemester"
                  value={settings.currentSemester}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

              </div>

            </div>

            {/* Attendance */}

            <div>

              <h2 className="text-xl font-semibold mb-6">
                Attendance Settings
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  type="number"
                  name="attendancePercentage"
                  value={settings.attendancePercentage}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <div></div>

                <input
                  type="time"
                  name="attendanceStartTime"
                  value={settings.attendanceStartTime}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  type="time"
                  name="attendanceEndTime"
                  value={settings.attendanceEndTime}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <label className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    name="allowAttendanceEdit"
                    checked={settings.allowAttendanceEdit}
                    onChange={handleChange}
                  />

                  Allow Attendance Editing

                </label>

              </div>

            </div>

            <div className="flex justify-end">

              <button
                onClick={save}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg"
              >
                {saving ? "Saving..." : "Save Settings"}
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}