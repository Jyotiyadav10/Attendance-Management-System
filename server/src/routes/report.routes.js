import express from "express";

import {
  getDashboardReport,
  getClassReport,
  getStudentReport,
  getSubjectReport,
  getTeacherReport,
  getMonthlyReport,
} from "../controllers/report.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Dashboard Report
router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("admin"),
  getDashboardReport
);

// Class Report
router.get(
  "/class",
  authMiddleware,
  authorizeRoles("admin"),
  getClassReport
);

// Student Report
router.get(
  "/student",
  authMiddleware,
  authorizeRoles("admin"),
  getStudentReport
);

// Subject Report
router.get(
  "/subject",
  authMiddleware,
  authorizeRoles("admin"),
  getSubjectReport
);

// Teacher Report
router.get(
  "/teacher",
  authMiddleware,
  authorizeRoles("admin"),
  getTeacherReport
);

// Monthly Report
router.get(
  "/monthly",
  authMiddleware,
  authorizeRoles("admin"),
  getMonthlyReport
);

export default router;