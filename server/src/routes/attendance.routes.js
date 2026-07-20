import express from "express";
import {
  markAttendance,
  getAttendanceByClass,
  getAttendanceByStudent,
} from "../controllers/attendance.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Teacher only
router.post(
  "/",
  authMiddleware,
  authorizeRoles("teacher"),
  markAttendance
);

// Admin and Teacher can view attendance
router.get(
  "/class/:classId",
  authMiddleware,
  authorizeRoles("admin", "teacher"),
  getAttendanceByClass
);
//    student 
router.get("/student/:studentId", (req, res) => {
  res.json({
    success: true,
    studentId: req.params.studentId
  });
});
export default router;