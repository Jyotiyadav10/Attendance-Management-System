import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import classRoutes from "./routes/class.routes.js";
import studentRoutes from "./routes/student.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import teacherAssignmentRoutes from "./routes/teacherAssignment.routes.js";
import reportRoutes from "./routes/report.routes.js";
import settingRoutes from "./routes/setting.routes.js";
import teacherDashboardRoutes from "./routes/teacherDashboard.routes.js";
//import teacherClassRoutes from "./routes/teacherClass.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Attendance System API is running..."
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/teacher-assignments", teacherAssignmentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/teacher/dashboard", teacherDashboardRoutes);
//app.use("/api/teacher/classes", teacherClassRoutes);

export default app;