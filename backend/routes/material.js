//backend\routes\material.js

const express = require("express");
const { uploadMaterial, getMaterials,getMaterialsbyclassid,deleteMaterial,togglePrivacy, getMaterialsforstudent, upload } = require("../controllers/materialController");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadMaterial);
//router.get("/materials", getMaterials);
router.post("/getMaterialsbyclassid", getMaterialsbyclassid);

router.post("/getMaterialsforstudent", getMaterialsforstudent);


// Delete material by ID
router.delete("/delete/:materialId", deleteMaterial); // Add the delete route

router.patch('/togglePrivacy/:materialId', togglePrivacy);

module.exports = router;
