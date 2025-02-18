const Material = require("../models/material");

const express = require("express");
const multer = require("multer");
const path = require("path");
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
    const { title, description, month,classid } = req.body;
    if (!req.file || !title || !description || !month || !req.body.classid) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMaterial = new Material({
      title,
      description,
      fileUrl: `/uploads/${req.file.filename}`,
      month,
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

const getMaterialsbyclassid = async (req, res) => {
    try {
      const { classid } = req.query;
  
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
  

module.exports = { uploadMaterial, getMaterials,getMaterialsbyclassid, upload };