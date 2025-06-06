const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Class = require('../models/Class');
const mongoose = require('mongoose');

//Create class
const createclass = async (req, res) => {
    const { teacherID, grade, subject, date, description, privacy, defaultMonthlyFee,year } = req.body;

    if (!teacherID || !grade || !subject || !date || !privacy || !defaultMonthlyFee || !year === undefined) {
        return res.status(400).json({ status: "error", message: "All fields are required." });
    }

    try {
        // Find the last created class by sorting `classid` in descending order
        const lastClass = await Class.findOne().sort({ classid: -1 });

        // Default to "C001" if no classes exist
        let newClassID = "C001";
        if (lastClass && lastClass.classid) {
            const lastClassNumber = parseInt(lastClass.classid.slice(1), 10); // Extract numeric part after "C"
            const nextClassNumber = (lastClassNumber + 1).toString().padStart(3, '0'); // Increment and pad to 3 digits
            newClassID = `C${nextClassNumber}`; // Generate the new `classid`
        }

        // Initialize monthlyFees using the default fee for all months
        const monthlyFees = {
            January: defaultMonthlyFee,
            February: defaultMonthlyFee,
            March: defaultMonthlyFee,
            April: defaultMonthlyFee,
            May: defaultMonthlyFee,
            June: defaultMonthlyFee,
            July: defaultMonthlyFee,
            August: defaultMonthlyFee,
            September: defaultMonthlyFee,
            October: defaultMonthlyFee,
            November: defaultMonthlyFee,
            December: defaultMonthlyFee
        };

        // Create the new class with the generated `classid`
        const newClass = new Class({
            classid: newClassID,
            grade,
            subject,
            date,
            description,
            privacy,
            teacher: teacherID,
            monthlyFees, // Set the same fee for all months
            year,
        });

        await newClass.save();
        res.json({ status: "ok", msg: 'Class created successfully', classid: newClassID });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};


// Controller to get all classes details
const getAllClasses = async (req, res) => {
    try {
        // Fetch all classes
        const classes = await Class.find().populate('teacher', '_id'); // Adjust as necessary for your schema
        res.status(200).json(classes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, could not retrieve classes' });
    }
};

// Controller to delete a class
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

// Controller to get the number of classes
const getClassCount = async (req, res) => {
    try {
        const classCount = await Class.countDocuments(); // Count the documents in Class collection
        res.status(200).json({ count: classCount });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving class count', error });
    }
};

const getClassesByTeacher = async (req, res) => {
    try {
      // Retrieve teacherId from the query parameters
      const { teacherId } = req.query;
      
      if (!teacherId) {
        return res.status(400).json({ message: "TeacherID is required" });
      }
  
      // Fetch classes associated with the specified teacher
      const classes = await Class.find({ teacher: teacherId });
  
      // Respond with a message if no classes were found
      if (classes.length === 0) {
        return res.status(404).json({ status:"noclassesyet",message: "No classes found for this teacher." });
      }
  
      // Send the classes back as a JSON response
      res.status(200).json(classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
      res.status(500).json({ message: "Server error" });
    }
  };


  const getFilteredClasses = async (req, res) => {
    try {
        const { subject, grade } = req.query;

        // Build a dynamic query object
        const query = {};
        if (subject) query.subject = subject;
        if (grade) query.grade = grade;

        const classes = await Class.find(query);

        if (classes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No classes found for the given subject and grade.',
            });
        }

        res.status(200).json({
            success: true,
            data: classes,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

// Controller function to get class details by class ID
const getClassDetails = async (req, res) => {
    try {
        const { classId } = req.params;
        
        // Input validation
        if (!classId) {
            return res.status(400).json({ message: 'Class ID is required' });
        }

        // Using a case-insensitive query for better matching
        const classDetails = await Class.findOne({ 
            classid: { $regex: new RegExp(`^${classId}$`, 'i') }
        });

        if (!classDetails) {
            return res.status(404).json({ 
                message: `Class with ID ${classId} not found` 
            });
        }

        res.status(200).json(classDetails);
        
    } catch (error) {
        console.error('Error fetching class details:', error.message);
        res.status(500).json({ 
            message: 'Error fetching class details',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
  

const Getgradesubject = async (req, res) => {
    try {
      // Fetch only public classes
      const classes = await Class.find({ privacy: 'Public' });
  
      // Extract unique grades and subjects from public classes
      const uniqueGrades = [...new Set(classes.map(cls => cls.grade))];
      const uniqueSubjects = [...new Set(classes.map(cls => cls.subject))];
  
      res.status(200).json({
        classes,
        uniqueGrades,
        uniqueSubjects,
      });
    } catch (error) {
      console.error('Error fetching classes:', error);
      res.status(500).json({ message: 'Failed to fetch classes' });
    }
  };
  

  
  


  const getClassesByStudent = async (req, res) => {
    const { studentId } = req.params;
    try {
      // Fetch classes where the studentId is in the students array
      const classes = await Class.find({ students: studentId });
  
      // Extract unique grades and subjects from the filtered classes
      const uniqueGrades = [...new Set(classes.map(cls => cls.grade))];
      const uniqueSubjects = [...new Set(classes.map(cls => cls.subject))];
  
      res.status(200).json({
        classes,
        uniqueGrades,
        uniqueSubjects,
      });
    } catch (error) {
      console.error('Error fetching classes by student:', error);
      res.status(500).json({ message: 'Failed to fetch classes for the student' });
    }
  };


  
  
 // module.exports = { getClassesByTeacher };
  

module.exports = {createclass,getAllClasses,deleteClass,getClassCount, getClassesByTeacher, getFilteredClasses, getClassDetails, Getgradesubject, getClassesByStudent};

