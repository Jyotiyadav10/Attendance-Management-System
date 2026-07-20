import Class from "../models/Class.js";
import Department from "../models/Department.js";

// Create Class
export const createClass = async (req, res) => {
  try {
    const {
      name,
      department,
      semester,
      section,
      academicYear,
    } = req.body;

    if (
      !name ||
      !department ||
      !semester ||
      !section ||
      !academicYear
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const departmentExists = await Department.findById(department);

    if (!departmentExists) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    const existingClass = await Class.findOne({
      name,
      department,
      semester,
      section,
      academicYear,
    });

    if (existingClass) {
      return res.status(400).json({
        success: false,
        message: "Class already exists.",
      });
    }

    const newClass = await Class.create({
      name,
      department,
      semester,
      section,
      academicYear,
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully.",
      class: newClass,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Classes
export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("department", "name code")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: classes.length,
      classes,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};