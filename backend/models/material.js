const mongoose = require("mongoose");

// Define Mongoose Schema & Model
const materialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    fileUrl: { type: String, required: true },
    month: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    classid: { type: String,required: true,unique: false,
    }
  });
  
  module.exports  = mongoose.model("Material", materialSchema);