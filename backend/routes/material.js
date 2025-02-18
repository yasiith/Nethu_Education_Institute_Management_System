const express = require("express");
const { uploadMaterial, getMaterials,getMaterialsbyclassid, upload } = require("../controllers/materialController");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadMaterial);
//router.get("/materials", getMaterials);
router.get("/materials/classid", getMaterialsbyclassid);

module.exports = router;
