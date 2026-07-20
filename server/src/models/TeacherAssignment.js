import mongoose from "mongoose";

const teacherAssignmentSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    academicYear: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate assignments
teacherAssignmentSchema.index(
  {
    teacher: 1,
    class: 1,
    subject: 1,
    academicYear: 1,
  },
  {
    unique: true,
  }
);

const TeacherAssignment = mongoose.model(
  "TeacherAssignment",
  teacherAssignmentSchema
);

export default TeacherAssignment;