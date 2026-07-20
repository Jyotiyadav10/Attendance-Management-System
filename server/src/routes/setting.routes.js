import express from "express";

import {
  getSettings,
  updateSettings,
} from "../controllers/setting.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Get Settings
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  getSettings
);

// Update Settings
router.put(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  updateSettings
);

export default router;