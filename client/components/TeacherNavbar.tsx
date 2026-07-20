"use client";

import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function TeacherNavbar() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();

    setCurrentDate(
      today.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <header className="bg-white shadow h-16 flex items-center justify-between px-8">

      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Teacher Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          {currentDate}
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="font-semibold text-gray-800">
            Teacher
          </p>

          <p className="text-sm text-gray-500">
            Faculty
          </p>
        </div>

        <FaUserCircle
          size={42}
          className="text-blue-600"
        />

      </div>

    </header>
  );
}