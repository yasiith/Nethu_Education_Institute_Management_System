const Class = require('../models/Class'); // Ensure you import your Class model

const enrollInClass = async (req, res) => {
    const { classId } = req.params; // Get the class ID from the request parameters

    try {
        // Find the class by custom classid field instead of _id
        const classToEnroll = await Class.findOne({ classid: classId });
        if (!classToEnroll) {
            return res.status(404).send({ message: "Class not found." });
        }

        // Check if the student is already enrolled
        if (classToEnroll.students.includes(req.user.id)) {
            return res.status(400).send({ message: "Already enrolled in this class." });
        }


        // Enroll the student by adding their ID to the class's students array
        classToEnroll.students.push(req.user.StudentID);
        await classToEnroll.save();

        res.status(200).send({ message: "Successfully enrolled in the class.", class: classToEnroll });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: "Error enrolling in class.", error: error.message });
    }
};

const checkEnrollmentStatus = async (req, res) => {
    const { classId } = req.params;

    try {
        // Find the class by custom classid field instead of _id
        const classData = await Class.findOne({ classid: classId });
        if (!classData) {
            return res.status(404).send({ message: "Class not found." });
        }

        // Check if the student is enrolled
        const isEnrolled = classData.students.includes(req.user.StudentID);

        res.status(200).send({ isEnrolled });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error checking enrollment status.", error: error.message });
    }
};

const unenrollFromClass = async (req, res) => {
    const { classId } = req.params;

    try {
        // Find the class by custom classid field instead of _id
        const classToUnenroll = await Class.findOne({ classid: classId });
        if (!classToUnenroll) {
            return res.status(404).send({ message: "Class not found." });
        }

        // Check if the student is enrolled
        if (!classToUnenroll.students.includes(req.user.StudentID)) {
            return res.status(400).send({ message: "You are not enrolled in this class." });
        }

        // Remove the student from the students array
        classToUnenroll.students = classToUnenroll.students.filter(
            (studentId) => studentId !== req.user.StudentID
        );

        await classToUnenroll.save();

        res.status(200).send({ message: "Successfully unenrolled from the class." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error unenrolling from class.", error: error.message });
    }
};

module.exports = { enrollInClass, checkEnrollmentStatus, unenrollFromClass };