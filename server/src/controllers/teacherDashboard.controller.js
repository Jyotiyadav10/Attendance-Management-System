import TeacherAssignment from "../models/TeacherAssignment.js";
import Attendance from "../models/Attendance.js";
import Subject from "../models/Subject.js";

export const getTeacherDashboard = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const assignments = await TeacherAssignment.find({
      teacher: teacherId,
    });

    const assignedClasses = new Set(
      assignments.map((item) => item.class.toString())
    );

    const assignedSubjects = new Set(
      assignments.map((item) => item.subject.toString())
    );

    const attendanceCount = await Attendance.countDocuments({
      teacher: teacherId,
    });

    res.status(200).json({
      success: true,
      dashboard: {
        assignedClasses: assignedClasses.size,
        assignedSubjects: assignedSubjects.size,
        attendanceRecords: attendanceCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};