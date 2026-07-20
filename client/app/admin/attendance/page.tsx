"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import AttendanceFilter from "./AttendanceFilter";
import AttendanceTable from "./AttendanceTable";

import { getClasses } from "@/services/class";
import { getSubjects } from "@/services/subject";
import { markAttendance } from "@/services/attendance";
import api from "@/services/api";

import { Class } from "@/types/class";
import { Subject } from "@/types/subject";

interface Student {
  _id: string;
  name: string;
  rollNo: number;
  enrollmentNo: string;
}

interface AttendanceItem {
  student: string;
  status: "Present" | "Absent";
}

export default function AttendancePage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceItem[]>([]);

  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const classRes = await getClasses();
      const subjectRes = await getSubjects();

      setClasses(classRes.classes || []);
      setSubjects(subjectRes.subjects || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadStudents = async () => {
    if (!classId) {
      alert("Please select a class.");
      return;
    }

    try {
      const res = await api.get(`/students/class/${classId}`);

      const list = res.data.students || [];

      setStudents(list);

      setAttendance(
        list.map((student: Student) => ({
          student: student._id,
          status: "Present",
        }))
      );
    } catch (error) {
      console.error(error);
      alert("Failed to load students.");
    }
  };

  const saveAttendance = async () => {
    if (!classId || !subjectId) {
      alert("Please select class and subject.");
      return;
    }

    try {
      await markAttendance({
        classId,
        subjectId,
        date,
        attendance,
      });

      alert("Attendance marked successfully.");
    } catch (error: any) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to save attendance."
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8 text-gray-900">
          <h1 className="mb-8 text-3xl font-bold">
            Attendance
          </h1>

          <AttendanceFilter
            classes={classes}
            subjects={subjects}
            classId={classId}
            subjectId={subjectId}
            date={date}
            setClassId={setClassId}
            setSubjectId={setSubjectId}
            setDate={setDate}
            onLoadStudents={loadStudents}
          />

          <AttendanceTable
            students={students}
            attendance={attendance}
            setAttendance={setAttendance}
            onSave={saveAttendance}
          />
        </div>
      </div>
    </div>
  );
}