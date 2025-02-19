const path = require("path");
const fs = require("fs");
const Material = require("../models/material");

const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: "uploads/", // Ensure this folder exists
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload Material API
const uploadMaterial = async (req, res) => {
  try {
    const { title, description, month, privacy, classid } = req.body;
    if (!req.file || !title || !description || !month || !privacy || !req.body.classid) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMaterial = new Material({
      title,
      description,
      fileUrl: `/uploads/${req.file.filename}`,
      month,
      privacy,
      classid,
    });

    await newMaterial.save();
    res.status(201).json({ message: "Material uploaded successfully.", material: newMaterial });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Materials by Month API
const getMaterials = async (req, res) => {
  try {
    const { month } = req.query;
    const filter = month ? { month } : {};
    const materials = await Material.find(filter);
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Materials by Class ID
const getMaterialsbyclassid = async (req, res) => {
  try {
    const { classid } = req.body;

    if (!classid) {
      return res.status(400).json({ message: "Class ID is required" });
    }

    // Fetch materials for the specified classId
    const materials = await Material.find({ classid });

    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Material
const deleteMaterial = async (req, res) => {
  const { materialId } = req.params; // Material ID to delete

  try {
    // Find the material by ID
    const material = await Material.findByIdAndDelete(materialId);

    if (!material) {
      return res.status(404).json({ message: "Material not found." });
    }

    // File path to delete
    const filePath = path.join(__dirname, "../uploads", material.fileUrl);

    // Check if the file exists before trying to delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Synchronously delete the file
    }

    res.status(200).json({ message: "Material deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting material." });
  }
};

const togglePrivacy = async (req, res) => {
  try {
    const { privacy } = req.body;
    const { materialId } = req.params;

    if (!["Public", "Private"].includes(privacy)) {
      return res.status(400).json({ message: "Invalid privacy value." });
    }

    const updatedMaterial = await Material.findByIdAndUpdate(
      materialId,
      { privacy },
      { new: true }
    );

    if (!updatedMaterial) {
      return res.status(404).json({ message: "Material not found." });
    }

    res.json({ message: "Privacy updated successfully.", material: updatedMaterial });
  } catch (error) {
    res.status(500).json({ message: "Error updating privacy." });
  }
};

module.exports = { uploadMaterial, getMaterials, getMaterialsbyclassid, deleteMaterial, togglePrivacy, upload };
