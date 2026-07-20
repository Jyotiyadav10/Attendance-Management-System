import express from "express";

import { getMyClasses } from "../controllers/teacherClass.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Get logged-in teacher's assigned classes
router.get(
  "/",
  authMiddleware,
  authorizeRoles("teacher"),
  getMyClasses
);

export default router;