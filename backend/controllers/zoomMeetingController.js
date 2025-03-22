const axios = require('axios');
const ZoomMeeting = require('../models/ZoomMeeting');
const Payment = require('../models/Payment');
const User = require('../models/User');

// Helper function to generate Zoom access token
const generateZoomToken = async () => {
  const accountId = process.env.ZOOM_ACCOUNT_ID;
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await axios.post(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`, {}, {
    headers: {
      Authorization: `Basic ${authString}`,
    },
  });

  return response.data.access_token;
};

// Create Zoom Meeting
exports.createZoomMeeting = async (req, res) => {
  const { topic, classId, month, startTime, duration, studentsAllowed, hostEmail } = req.body;
  const teacherId = req.user.TeacherID;

  try {
    const accessToken = await generateZoomToken();

    // Use the host's email in the API endpoint
    const meetingResponse = await axios.post(`https://api.zoom.us/v2/users/${hostEmail}/meetings`, {
      topic,
      classId,
      month,
      type: 2, // Scheduled meeting
      start_time: startTime,
      duration,
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: true,
        waiting_room: false,
      },
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const zoomMeeting = new ZoomMeeting({
      teacherId,
      meetingId: meetingResponse.data.id,
      topic,
      classId,
      month,
      startTime,
      duration,
      joinUrl: meetingResponse.data.join_url,
      password: meetingResponse.data.password,
      hostEmail, // Save the host's email
    });

    await zoomMeeting.save();

    res.status(201).json({ status: "ok", data: zoomMeeting });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get Zoom Meeting Details for Students
exports.getZoomMeetingDetails = async (req, res) => {
  const studentId = req.user.StudentID;

  try {
    // Check if the student has paid for the current month
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();

    const payment = await Payment.findOne({
      student: { StudentID: studentId },
      //month: currentMonth,
      //year: currentYear,
      status: 'Completed',
    });

    if (!payment) {
      return res.status(403).json({ msg: 'Payment required to access the meeting' });
    }

    // Find meetings where the student is allowed
    const meetings = await ZoomMeeting.find({ studentsAllowed: studentId });

    res.status(200).json({ status: "ok", data: meetings });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};