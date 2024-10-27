const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Class = require('../models/Class');
const mongoose = require('mongoose');


// controller to create a new class
const createClass = async (req, res) => {
    const {grade, subject, date, description, privacy} = req.body;
    try {
        // create a new class instance
        const newClass = new Class({
            grade,
            subject,
            date,
            description,
            privacy,
            teacher: req.user.id,
        });

        // save the class to the database
        await newClass.save();
        res.json({ msg: 'Class created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server Error, please try again'});
    }
}

// Controller to get all classes details
const getAllClasses = async (req, res) => {
    try {
      // Fetch all classes
      const classes = await Class.find().populate('teacher', '_id'); // Only populates the teacher's ObjectId
      res.status(200).json(classes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error, could not retrieve classes' });
    }
  };

  
  const deleteClass = async (req, res) => {
      const { classId } = req.params; // Get the class ID from the request parameters
  
      // Check if the provided classId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(classId)) {
          return res.status(400).send({ message: "Invalid class ID format." });
      }
  
      try {
          // Find the class by ID
          const classToDelete = await Class.findById(classId);
          if (!classToDelete) {
              return res.status(404).send({ message: "Class not found." });
          }
  
          // Check if the teacher is the owner of the class
          if (classToDelete.teacher.toString() !== req.user.id.toString()) {
              return res.status(403).send({ message: "Not authorized to delete this class." });
          }
  
          // Delete the class
          await Class.findByIdAndDelete(classId);
          res.status(200).send({ message: "Class deleted successfully." });
      } catch (error) {
          // Handle Mongoose validation errors
          if (error instanceof mongoose.Error) {
              return res.status(500).send({ message: "Database error.", error: error.message });
          }
  
          // Handle general errors
          console.error(error); // Log the error for debugging
          res.status(500).send({ message: "An error occurred while deleting the class.", error: error.message });
      }
  };
  

module.exports = {createClass,getAllClasses,deleteClass};