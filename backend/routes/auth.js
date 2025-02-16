const express = require('express');
const User = require('../models/User');
const { registerAdmin, createUser, loginUser, getUser, createStudent, createTeacher,deleteStudent,getStudents,getTeachers, deleteTeacher } = require('../controllers/authController');
const { getStudentInfo,updateStudentInfo} = require('../controllers/userupdate');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { createAnnouncement, updateAnnouncement, deleteAnnouncement,getAllAnnouncements } = require('../controllers/AnnouncementController');
const Class = require('../models/Class');



const router = express.Router();

// Admin routes

router.post('/api/auth/register-admin', registerAdmin);
router.post('/api/auth/create-student', auth, checkRole('admin'), createStudent);
router.post('/api/auth/create-teacher', auth, checkRole('admin'), createTeacher);
router.get('/api/auth/viewstudents', auth, checkRole('admin'), getStudents);

router.get('/api/auth/viewteachers', auth, checkRole('admin'), getTeachers);

//router.get('/api/auth/getstudentinfo/:id', getStudentInfo);
//router.put('/api/auth/updatestudent/:id', updateStudentInfo);
router.get('/api/auth/getstudentinfo/:id',getStudentInfo)
router.put('/api/auth/updatestudent/:id', updateStudentInfo);


router.delete('/api/auth/delete-student/:id', auth, checkRole('admin'), deleteStudent);
router.delete('/api/auth/delete-teacher/:id', auth, checkRole('admin'), deleteTeacher);
// Auth routes
router.post('/api/auth/login', loginUser);

router.get('/api/auth/user', auth, getUser);  // For the authenticated user
router.get('/api/auth/user/:id', auth, checkRole('admin'), getUser);


// Announcement routes
router.post('/api/auth/announcements', auth, checkRole('admin'), createAnnouncement); // Create a new announcement
router.put('/api/auth/announcements/:id', auth, checkRole('admin'), updateAnnouncement); // Update an existing announcement
router.delete('/api/auth/announcements/:id', auth, checkRole('admin'), deleteAnnouncement); // Delete an existing announcement
router.get('/api/auth/announcements', auth, checkRole('admin'), getAllAnnouncements); // fetch all announcements



// Test route
router.get('/api/auth/test', (req, res) => {
    res.json({ msg: 'Test route works' });
});


// GET students by classid
router.get('/api/class/:classid/students', async (req, res) => {
    try {
        const { classid } = req.params;

        // Find class by classid
        const classData = await Class.findOne({ classid });

        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.json({ students: classData.students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get user name by StudentID
router.get('/api/user/name/:StudentID', async (req, res) => {
    try {
      const studentID = req.params.StudentID;
      const user = await User.findOne({ StudentID: studentID });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Respond with the user's name
      res.json({ name: user.name });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });



module.exports = router;
