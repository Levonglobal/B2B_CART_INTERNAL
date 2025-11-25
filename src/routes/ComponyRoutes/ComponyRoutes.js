import express from "express";
import {
  getAllCompanies,
  getAllCompaniesNameAndId,
  getCompanyById,
  updateCompany,
  deleteCompany,
  changeStatus,
  filtercomponyByName
} from "../../controllers/ComponyController/ComponyController.js";

import { authMiddleware } from "../../middleware/AuthMiddilewereAll.js";
import { permissionMiddleware } from "../../middleware/PermissionMidilewere.js";

const router = express.Router();

// Get all companies
router.get("/", authMiddleware, getAllCompanies);

// Filter companies by name (search box)
router.get("/filter", authMiddleware, filtercomponyByName);

// Get only names and ids
router.get("/names-and-ids", getAllCompaniesNameAndId);

// Get company by ID
router.get("/:id", authMiddleware, getCompanyById);

// Update company
router.put("/:id", authMiddleware, updateCompany);

// Change company status (Active / Inactive)
router.put("/change-status/:id", authMiddleware, changeStatus);

// Delete company
router.delete("/:id", authMiddleware, deleteCompany);

export default router;
