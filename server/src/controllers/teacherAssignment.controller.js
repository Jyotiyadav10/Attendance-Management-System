import TeacherAssignment from "../models/TeacherAssignment.js";
import Teacher from "../models/Teacher.js";
import Class from "../models/Class.js";
import Subject from "../models/Subject.js";

// ================= ASSIGN TEACHER =================
export const assignTeacher = async (req, res) => {
  try {
    const {
      teacher,
      class: classId,
      subject,
      academicYear,
      semester,
    } = req.body;

    if (
      !teacher ||
      !classId ||
      !subject ||
      !academicYear ||
      !semester
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const teacherExists = await Teacher.findById(teacher);

    if (!teacherExists) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    const classExists = await Class.findById(classId);

    if (!classExists) {
      return res.status(404).json({
        success: false,
        message: "Class not found.",
      });
    }

    const subjectExists = await Subject.findById(subject);

    if (!subjectExists) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    const exists = await TeacherAssignment.findOne({
      teacher,
      class: classId,
      subject,
      academicYear,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Assignment already exists.",
      });
    }

    const assignment = await TeacherAssignment.create({
      teacher,
      class: classId,
      subject,
      academicYear,
      semester,
    });

    res.status(201).json({
      success: true,
      message: "Teacher assigned successfully.",
      assignment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL ASSIGNMENTS =================
export const getAssignments = async (req, res) => {
  try {
    const assignments = await TeacherAssignment.find()
      .populate("teacher", "name employeeId")
      .populate("class", "name section")
      .populate("subject", "name code")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assignments.length,
      assignments,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ASSIGNMENTS OF ONE TEACHER =================
export const getAssignmentsByTeacher = async (req, res) => {
  try {
    const assignments = await TeacherAssignment.find({
      teacher: req.params.teacherId,
    })
      .populate("class", "name section")
      .populate("subject", "name code");

    res.status(200).json({
      success: true,
      count: assignments.length,
      assignments,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};