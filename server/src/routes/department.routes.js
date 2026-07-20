import express from "express";
import {
  createDepartment,
  getDepartments,
} from "../controllers/department.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Only Admin can create departments
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createDepartment
);

// Admin and Teacher can view departments
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "teacher"),
  getDepartments
);

export default router;