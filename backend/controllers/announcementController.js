const Announcement = require('../models/Announcement'); // Import the Announcement model

// Create a new announcement
const createAnnouncement = async (req, res) => {
    try {
        const { grade, subject, date, description } = req.body;

        // Validate request data
        if (!grade || !subject || !date || !description) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        // Create a new announcement
        const newAnnouncement = new Announcement({
            grade,
            subject,
            date,
            description
        });

        // Save the announcement
        await newAnnouncement.save();
        res.status(201).send({ message: 'Announcement created successfully.', announcement: newAnnouncement, status: 'ok' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error creating announcement.', error: error.message });
    }
};

// Fetch all announcements
const getAllAnnouncements = async (req, res) => {
    try {
        // Find all announcements
        const announcements = await Announcement.find();

        // Send the announcements as a response
        res.status(200).json({
            message: "Announcements fetched successfully.",
            announcements
        });
    } catch (error) {
        console.error("Error fetching announcements:", error);
        res.status(500).json({
            message: "Error fetching announcements.",
            error: error.message
        });
    }
};


// Update an existing announcement
const updateAnnouncement = async (req, res) => {
    const { id } = req.params; // Get the announcement ID from the URL
    const { grade, subject, date, description } = req.body;

    try {
        // Find the announcement by ID and update it
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            id,
            { grade, subject, date, description },
            { new: true, runValidators: true } // Returns the updated document and runs schema validation
        );

        if (!updatedAnnouncement) {
            return res.status(404).send({ message: 'Announcement not found.' });
        }

        res.status(200).send({ message: 'Announcement updated successfully.', announcement: updatedAnnouncement });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating announcement.', error: error.message });
    }
};

// Delete an existing announcement
const deleteAnnouncement = async (req, res) => {
    const { id } = req.params; // Get the announcement ID from the URL

    try {
        // Find the announcement by ID and delete it
        const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

        if (!deletedAnnouncement) {
            return res.status(404).send({ message: 'Announcement not found.' });
        }

        res.status(200).send({ message: 'Announcement deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error deleting announcement.', error: error.message });
    }
};

module.exports = {
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAllAnnouncements,
};
