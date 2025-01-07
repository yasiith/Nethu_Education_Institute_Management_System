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
        classToEnroll.students.push(req.user.id);
        await classToEnroll.save();

        res.status(200).send({ message: "Successfully enrolled in the class.", class: classToEnroll });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: "Error enrolling in class.", error: error.message });
    }
};


module.exports = { enrollInClass };
