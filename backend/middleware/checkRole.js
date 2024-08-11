const User = require('../models/User');
const { start } = require('repl');

const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (user.role !== role) {
        return res.status(403).json({ msg: 'Access denied' });
      }
      next();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
};

module.exports = checkRole;
