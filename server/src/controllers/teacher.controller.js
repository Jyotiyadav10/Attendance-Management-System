import Teacher from "../models/Teacher.js";
import Department from "../models/Department.js";
import User from "../models/User.js";

// ================= CREATE TEACHER =================
export const createTeacher = async (req, res) => {
  try {
    const {
      name,
      employeeId,
      email,
      phone,
      gender,
      department,
      designation,
      qualification,
      experience,
    } = req.body;

    if (
      !name ||
      !employeeId ||
      !email ||
      !gender ||
      !department
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Check department
    const departmentExists = await Department.findById(department);

    if (!departmentExists) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    // Check Teacher
    const existingTeacher = await Teacher.findOne({
      $or: [
        { email },
        { employeeId },
      ],
    });

    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Teacher already exists.",
      });
    }

    // Check User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists.",
      });
    }

    // Create Teacher
    const teacher = await Teacher.create({
      name,
      employeeId,
      email,
      phone,
      gender,
      department,
      designation,
      qualification,
      experience,
    });

    // Create Login User
    await User.create({
      name,
      email,
      password: "Teacher@123", // Default password
      role: "teacher",
      phone,
      teacher: teacher._id,
    });

    res.status(201).json({
      success: true,
      message:
        "Teacher and login account created successfully.",
      teacher,
      login: {
        email,
        password: "Teacher@123",
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL TEACHERS =================
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate("department", "name code")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: teachers.length,
      teachers,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET TEACHER BY ID =================
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate("department", "name code");

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    res.status(200).json({
      success: true,
      teacher,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};