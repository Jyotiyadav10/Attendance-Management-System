import express from "express";
import {
  createSubject,
  getSubjects,
} from "../controllers/subject.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Only Admin can create subjects
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createSubject
);

// Admin and Teacher can view subjects
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "teacher"),
  getSubjects
);

export default router;