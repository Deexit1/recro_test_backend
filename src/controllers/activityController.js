const Activity = require('../models/Activity');

// Create Activity
exports.createActivity = async (req, res) => {
    try {
        const activity = new Activity(req.body);
        await activity.save();
        res.status(201).json(activity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Activities
exports.getActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Activity by ID
exports.getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) return res.status(404).json({ message: 'Activity not found' });
        res.json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Activity by ID
exports.updateActivity = async (req, res) => {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedActivity) return res.status(404).json({ message: 'Activity not found' });
        res.json(updatedActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Activity by ID
exports
