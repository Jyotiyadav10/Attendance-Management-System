import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";

// ================= MARK ATTENDANCE =================
export const markAttendance = async (req, res) => {
  try {
    const { classId, subjectId, date, attendance } = req.body;

    if (!classId || !subjectId || !date || !attendance) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Check duplicate attendance
    const existingAttendance = await Attendance.findOne({
      class: classId,
      subject: subjectId,
      date: new Date(date),
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked for this class on this date.",
      });
    }

    // Verify all students belong to the class
    const studentIds = attendance.map((item) => item.student);

    const students = await Student.find({
      _id: { $in: studentIds },
      class: classId,
    });

    if (students.length !== studentIds.length) {
      return res.status(400).json({
        success: false,
        message: "One or more students do not belong to this class.",
      });
    }

    const newAttendance = await Attendance.create({
      class: classId,
      subject: subjectId,
      teacher: req.user._id,
      date: new Date(date),
      attendance,
    });

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully.",
      attendance: newAttendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ATTENDANCE BY CLASS =================
export const getAttendanceByClass = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      class: req.params.classId,
    })
      .populate("subject", "name code")
      .populate("teacher", "name email")
      .populate("attendance.student", "name rollNo enrollmentNo")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET STUDENT ATTENDANCE =================
export const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const attendance = await Attendance.find({
      "attendance.student": studentId,
    })
      .populate("subject", "name code")
      .populate("class", "name semester section")
      .sort({ date: -1 });

    const studentAttendance = attendance.map((record) => {
      const studentRecord = record.attendance.find(
        (item) => item.student.toString() === studentId
      );

      return {
        date: record.date,
        subject: record.subject,
        class: record.class,
        status: studentRecord.status,
      };
    });

    res.status(200).json({
      success: true,
      totalRecords: studentAttendance.length,
      attendance: studentAttendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};