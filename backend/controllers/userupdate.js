const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
///const mongoose = require('mongoose'); // Added this import
const User = require('../models/User');


exports.getStudentInfo = async (req, res) => {
    try {
        const StudentID = req.params.id;
        const student = await User.findOne({ StudentID }).select('name email -_id');

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json({ data: student });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
// Update student name and email by StudentID
exports.updateStudentInfo = async (req, res) => {
    const { name, email } = req.body;
    const StudentID = req.params.id;

    try {
        const student = await User.findOneAndUpdate(
            { StudentID },
            { name, email },
            { new: true, select: 'name email -_id' } // Return updated name and email only
        );

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json({ success: true, message: 'Student info updated successfully', data: student });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
