import express from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentsByClass,
} from "../controllers/student.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Admin only
router.post("/", authMiddleware, authorizeRoles("admin"), createStudent);
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateStudent);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteStudent);

// Admin and Teacher
router.get("/", authMiddleware, authorizeRoles("admin", "teacher"), getStudents);
router.get(
  "/class/:classId",
  authMiddleware,
  authorizeRoles("admin", "teacher"),
  getStudentsByClass
);
router.get("/:id", authMiddleware, authorizeRoles("admin", "teacher"), getStudentById);

export default router;