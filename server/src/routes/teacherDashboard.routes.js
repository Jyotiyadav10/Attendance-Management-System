import express from "express";

import { getTeacherDashboard } from "../controllers/teacherDashboard.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authorizeRoles("teacher"),
  getTeacherDashboard
);

export default router;