import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
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

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    attendance: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },

        status: {
          type: String,
          enum: ["Present", "Absent", "Late"],
          default: "Present",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate attendance for same class, subject and date
attendanceSchema.index(
  {
    class: 1,
    subject: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;