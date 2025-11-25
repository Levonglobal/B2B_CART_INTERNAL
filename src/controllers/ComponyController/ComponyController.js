import Company from "../../models/componyModel/ComponyModel.js";
import Invoice from "../../models/InvoiceModel/InvoiceModel.js";
import Agent from "../../models/AgentModel/AgentModel.js"

// Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .populate("invoiceIds")   // field in Company schema
      .populate("ProformainvoiceIds")
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCompaniesNameAndId = async (req, res) => {
  try {
    const companies = await Company.find().select("_id companyName")
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get company by ID
export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id)
      .populate("invoiceIds")   // field in Company schema
      .populate("ProformainvoiceIds")
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit company
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const company = await Company.findByIdAndUpdate(id, updatedData, { new: true });
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete company
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["Active", "Inactive","Pending"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const company = await Company.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ message: "Status updated successfully", company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filtercomponyByName = async (req, res) => {
  try {
    const { name } = req.query;
    const companies = await Company.find({
      companyName: { $regex: name, $options: "i" },
    })
    .populate("invoiceIds")   // field in Company schema
    .populate("ProformainvoiceIds")
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

