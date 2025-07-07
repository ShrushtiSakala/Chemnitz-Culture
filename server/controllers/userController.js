const User = require('../models/User');

exports.addFavorite = async (req, res) => {
  try {
    const { uid }  = req.params;
    const { siteId } = req.body;
    // Ensure the user is modifying their own favorites
    if (req.user.id !== uid)
      return res.status(403).json({ error: 'Forbidden' });

    const user = await User.findByIdAndUpdate(
      uid,
      { $addToSet: { favorites: siteId } },
      { new: true }
    ).populate('favorites');

    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { uid, siteId } = req.params;
    if (req.user.id !== uid)
      return res.status(403).json({ error: 'Forbidden' });

    const user = await User.findByIdAndUpdate(
      uid,
      { $pull: { favorites: siteId } },
      { new: true }
    ).populate('favorites');

    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const { uid } = req.params;
    if (req.user.id !== uid)
      return res.status(403).json({ error: 'Forbidden' });

    const user = await User.findById(uid).populate('favorites');
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { uid } = req.params;
    if (req.user.id !== uid)
      return res.status(403).json({ error: 'Forbidden' });

    // Only accept name and/or location
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.location) updates.location = req.body.location;

    const user = await User.findByIdAndUpdate(
      uid,
      { $set: updates },
      { new: true, fields: '-password' }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { uid } = req.params;
    // guard: only the user themselves can fetch
    if (req.user.id !== uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    // omit the password
    const user = await User.findById(uid).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};