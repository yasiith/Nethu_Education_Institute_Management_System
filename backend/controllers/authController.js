const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register Admin
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password, role: 'admin' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ msg: 'Admin created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create User (Teacher )
exports.createTeacher = async (req, res) => {
  const { name, email, TeacherID } = req.body;
  let password = TeacherID;

  // if (role !== 'teacher' && role !== 'student') {
  //   return res.status(400).json({ msg: 'Invalid role' });
  // }

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, TeacherID, role:'teacher',password});

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ status:"ok",msg: 'Teacher created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create User (Student)
exports.createStudent = async (req, res) => {
  const { name, email, StudentID } = req.body;
  let password = StudentID;

  // if (role !== 'teacher' && role !== 'student') {
  //   return res.status(400).json({ msg: 'Invalid role' });
  // }

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, StudentID, role:'student',password });

    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ status:"ok", msg: 'Student created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ status:"ok", data:token, type:user.role});
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get User Data
/*exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};*/

exports.getUser = async (req, res) => {
  try {
    // If a user ID is provided in the request params, fetch that user's data
    const userId = req.params.id ? req.params.id : req.user.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const StudentID = req.params.id; // Get student ID from request params

    // Find the student by their StudentID
    const user = await User.findOne({ StudentID }).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    await User.findOneAndDelete({ StudentID }); // Delete the user by StudentID
    res.json({ msg: 'Student deleted' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

