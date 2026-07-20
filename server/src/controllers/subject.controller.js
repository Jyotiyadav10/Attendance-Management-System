import Subject from "../models/Subject.js";
import Department from "../models/Department.js";

// Create Subject
export const createSubject = async (req, res) => {
  try {
    const { name, code, department, semester, credits } = req.body;

    if (!name || !code || !department || !semester) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Check department exists
    const departmentExists = await Department.findById(department);

    if (!departmentExists) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    // Check duplicate subject code
    const existingSubject = await Subject.findOne({ code });

    if (existingSubject) {
      return res.status(400).json({
        success: false,
        message: "Subject code already exists.",
      });
    }

    const subject = await Subject.create({
      name,
      code,
      department,
      semester,
      credits,
    });

    res.status(201).json({
      success: true,
      message: "Subject created successfully.",
      subject,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Subjects
export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate("department", "name code")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: subjects.length,
      subjects,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};