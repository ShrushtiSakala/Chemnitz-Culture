const bcrypt = require('bcryptjs');
const User   = require('../models/User');
const jwt    = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
      name: username,                       // ← here
      location: { type: 'Point', coordinates: [] }
    });

    res.status(201).json({ message: 'User created', userId: user._id });
  } catch (err) {
    if (err.code === 11000) {
        // Duplicate key error
      const field = Object.keys(err.keyValue)[0];
      const value = err.keyValue[field];
      const prettyField = field.charAt(0).toUpperCase() + field.slice(1);
      return res
        .status(400)
        .json({ error: `${prettyField} "${value}" is already in use. Please choose another.` });
    }
    res.status(400).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
