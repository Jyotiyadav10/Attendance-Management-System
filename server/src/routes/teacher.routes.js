import express from "express";

import {
  createTeacher,
  getTeachers,
  getTeacherById,
} from "../controllers/teacher.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Admin only
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createTeacher
);

// Admin only
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  getTeachers
);

// Admin only
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  getTeacherById
);

export default router;