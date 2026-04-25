import User from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');  // Exclude passwords
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Server Error: ", error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (user.role === 'admin' && req.user._id.toString() === id) {
      return res.status(403).json({ success: false, message: 'Cannot delete yourself as admin' });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error("Server Error: ", error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role' });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Server Error: ", error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};