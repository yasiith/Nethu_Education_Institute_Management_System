const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const User = require('../models/User'); // adjust path as needed
const { getAllClasses, createclass,getClassesByTeacher,getFilteredClasses ,getClassDetails, Getgradesubject, getClassesByStudent } = require('../controllers/classController');

// Define the GET route for fetching all classes
router.get('/api/classes', getAllClasses);

router.get('/api/classes/getClassesByTeacher', getClassesByTeacher);


// Define the POST route for creating a new class
router.post('/api/classes/createclass', createclass);

// Route to filter classes by subject and grade
router.get('/api/classes/filter', getFilteredClasses);

//get class subject grade
router.get('/api/classes/Getgradesubject', Getgradesubject);

// GET /api/classes/:classId - Retrieve class details by class ID
router.get('/api/classes/:classId', getClassDetails); // Use the controller function here

router.get('/classes/student/:studentId', getClassesByStudent);


// PUT /api/classes/updateClassVisibility
// PUT: Update class visibility
router.put('/api/classes/updateClassVisibility', async (req, res) => {
    const { classId, visibility } = req.body;
  
    if (!classId || !visibility) {
      return res.status(400).json({ error: 'classId and visibility are required.' });
    }
  
    if (!['public', 'private'].includes(visibility.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid visibility value.' });
    }
  
    try {
      const updatedClass = await Class.findOneAndUpdate(
        { classid: classId },
        { privacy: visibility.toLowerCase() === 'public' ? 'Public' : 'Private' },
        { new: true }
      );
  
      if (!updatedClass) {
        return res.status(404).json({ error: 'Class not found.' });
      }
  
      res.status(200).json({ message: 'Visibility updated successfully.' });
    } catch (error) {
      console.error('Error updating visibility:', error);
      res.status(500).json({ error: 'Server error.' });
    }
  });





  // GET teacher info by TeacherID
router.get('/api/auth/getteacherinfo/:teacherID', async (req, res) => {
    const { teacherID } = req.params;
  
    try {
      const teacher = await User.findOne({ TeacherID: teacherID, role: 'teacher' });
  
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found.' });
      }
  
      return res.status(200).json({
        message: 'Teacher info retrieved successfully.',
        data: {
          name: teacher.name,
          email: teacher.email,
        },
      });
    } catch (error) {
      console.error('Error retrieving teacher info:', error);
      return res.status(500).json({ error: 'Server error while retrieving teacher info.' });
    }
  });
  
  // PUT update teacher info by TeacherID
  router.put('/api/auth/updateteacher/:teacherID', async (req, res) => {
    const { teacherID } = req.params;
    const { name, email } = req.body;
  
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }
  
    try {
      const teacher = await User.findOneAndUpdate(
        { TeacherID: teacherID, role: 'teacher' },
        { name, email },
        { new: true, runValidators: true }
      );
  
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found.' });
      }
  
      return res.status(200).json({
        message: 'Teacher updated successfully.',
        data: {
          name: teacher.name,
          email: teacher.email,
        },
      });
    } catch (error) {
      console.error('Error updating teacher info:', error);
      return res.status(500).json({ error: 'Server error while updating teacher info.' });
    }
  });



getClassesByTeacher

module.exports = router;
