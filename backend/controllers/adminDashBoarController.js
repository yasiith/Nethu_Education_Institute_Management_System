const Class = require('../models/Class');
const User = require('../models/User')

// get the number of classes
const getClassCount = async (req, res) => {
    try {
        const classCount = await Class.countDocuments(); // Count the documents in Class collection
        res.status(200).json({ classCount: classCount });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving class count', error });
    }
};

// get the number of students
const getStudentCount = async (req, res) => {
    try {
        const studentCount = await User.countDocuments({ role: 'student' }); // Count only students
        res.status(200).json({ studentCount });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving student count', error });
    }
};

// get the number of teachers
const getTeacherCount = async (req, res) => {
    try {
        const teacherCount = await User.countDocuments({ role: 'teacher' }); // Count only teachers
        res.status(200).json({ teacherCount });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving teacher count', error });
    }
};


module.exports = { getClassCount,getStudentCount,getTeacherCount };
