const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, password, role });
        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Log in a user
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user data (protected route)
const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { register, login, getUserData };
