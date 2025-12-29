import express from "express";
import {
  createManager,
  getAllManagers,
  getManagerById,
  updateManager,
  deleteManager,
} from "../../controllers/ManagerController/ManagerController.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";
import { permissionMiddleware } from "../../middleware/PermissionMidilewere.js";

const router = express.Router();

// Manager Routes
router.post("/", authMiddleware, permissionMiddleware(), createManager);
router.get("/", authMiddleware, getAllManagers);
router.get("/:id", authMiddleware, getManagerById);
router.put("/:id", authMiddleware, permissionMiddleware(), updateManager);
router.delete("/:id", authMiddleware, permissionMiddleware(), deleteManager);

export default router;


