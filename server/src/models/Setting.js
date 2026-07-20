import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    // Institute Information
    instituteName: {
      type: String,
      default: "",
      trim: true,
    },

    instituteCode: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    logo: {
      type: String,
      default: "",
    },

    // Academic Settings
    academicYear: {
      type: String,
      default: "",
    },

    currentSemester: {
      type: Number,
      default: 1,
    },

    attendancePercentage: {
      type: Number,
      default: 75,
    },

    // Attendance Settings
    attendanceStartTime: {
      type: String,
      default: "09:00",
    },

    attendanceEndTime: {
      type: String,
      default: "10:00",
    },

    allowAttendanceEdit: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Setting = mongoose.model("Setting", settingSchema);

export default Setting;