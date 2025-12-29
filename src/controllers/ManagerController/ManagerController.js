import * as managerService from "../../service/ManagerService.js";

/**
 * Create a new manager
 */
export const createManager = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    // Validate required fields
    if (!name || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and mobile are required",
      });
    }

    const result = await managerService.createManager({ name, email, mobile });
    res.status(201).json({
      success: true,
      message: "Manager created successfully",
      manager: result.manager,
    });
  } catch (error) {
    console.error("Error in createManager:", error);
    if (error.message === "Manager with this email already exists") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * Get all managers
 */
export const getAllManagers = async (req, res) => {
  try {
    const { page, limit, noPagination } = req.query;
    const result = await managerService.getAllManagers({ page, limit, noPagination });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getAllManagers:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * Get manager by ID
 */
export const getManagerById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await managerService.getManagerById(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getManagerById:", error);
    if (error.message === "Manager not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * Update manager by ID
 */
export const updateManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (mobile) updateData.mobile = mobile;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field (name, email, mobile) must be provided for update",
      });
    }

    const result = await managerService.updateManager(id, updateData);
    res.status(200).json({
      success: true,
      message: "Manager updated successfully",
      manager: result.manager,
    });
  } catch (error) {
    console.error("Error in updateManager:", error);
    if (error.message === "Manager not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    if (error.message === "Manager with this email already exists") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * Delete manager by ID
 */
export const deleteManager = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await managerService.deleteManager(id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Error in deleteManager:", error);
    if (error.message === "Manager not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


