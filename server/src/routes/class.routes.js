import express from "express";
import {
  createClass,
  getClasses,
} from "../controllers/class.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Only Admin can create classes
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createClass
);

// Admin and Teacher can view classes
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "teacher"),
  getClasses
);

export default router;