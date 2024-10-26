const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Class = require('../models/Class');

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
        });

        // save the class to the database
        await newClass.save();

        res.json({ msg: 'Class created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server Error, please try again'});
    }
}

module.exports = {createClass};