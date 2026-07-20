import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Class from "../models/Class.js";
import Subject from "../models/Subject.js";

// ================= DASHBOARD REPORT =================
export const getDashboardReport = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments({
      isActive: true,
    });

    const totalTeachers = await Teacher.countDocuments({
      isActive: true,
    });

    const totalClasses = await Class.countDocuments({
      isActive: true,
    });

    const totalSubjects = await Subject.countDocuments({
      isActive: true,
    });

    const totalAttendance = await Attendance.countDocuments();

    res.status(200).json({
      success: true,
      report: {
        totalStudents,
        totalTeachers,
        totalClasses,
        totalSubjects,
        totalAttendance,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CLASS REPORT =================
export const getClassReport = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Class report API coming next.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= STUDENT REPORT =================
export const getStudentReport = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Student report API coming next.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= SUBJECT REPORT =================
export const getSubjectReport = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Subject report API coming next.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= TEACHER REPORT =================
export const getTeacherReport = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Teacher report API coming next.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= MONTHLY REPORT =================
export const getMonthlyReport = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Monthly report API coming next.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};