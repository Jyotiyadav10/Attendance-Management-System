import Student from "../models/Student.js";
import Class from "../models/Class.js";

// ================= CREATE STUDENT =================
export const createStudent = async (req, res) => {
  try {
    const {
      name,
      enrollmentNo,
      rollNo,
      email,
      phone,
      gender,
      class: classId,
    } = req.body;

    // Validation
    if (
      !name ||
      !enrollmentNo ||
      !rollNo ||
      !email ||
      !gender ||
      !classId
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Check class exists
    const existingClass = await Class.findById(classId);

    if (!existingClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found.",
      });
    }

    // Check duplicate enrollment
    const existingStudent = await Student.findOne({
      enrollmentNo,
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Enrollment number already exists.",
      });
    }

    const student = await Student.create({
      name,
      enrollmentNo,
      rollNo,
      email,
      phone,
      gender,
      class: classId,
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully.",
      student,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL STUDENTS =================
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate({
        path: "class",
        populate: {
          path: "department",
          select: "name code",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET STUDENT BY ID =================
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate({
        path: "class",
        populate: {
          path: "department",
          select: "name code",
        },
      });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE STUDENT =================
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully.",
      student,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE STUDENT =================
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ================= GET STUDENTS BY CLASS =================
export const getStudentsByClass = async (req, res) => {
  try {
    const students = await Student.find({
      class: req.params.classId,
      isActive: true,
    }).sort({ rollNo: 1 });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};