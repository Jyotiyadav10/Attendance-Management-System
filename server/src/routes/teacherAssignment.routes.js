import express from "express";

import {
  assignTeacher,
  getAssignments,
  getAssignmentsByTeacher,
} from "../controllers/teacherAssignment.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// ================= ASSIGN TEACHER =================
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  assignTeacher
);

// ================= GET ALL ASSIGNMENTS =================
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  getAssignments
);

// ================= GET ASSIGNMENTS BY TEACHER =================
router.get(
  "/teacher/:teacherId",
  authMiddleware,
  authorizeRoles("admin", "teacher"),
  getAssignmentsByTeacher
);

export default router;