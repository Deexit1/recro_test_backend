const Application = require('../models/Application');

// Create Application
exports.createApplication = async (req, res) => {
    try {
        const application = new Application(req.body);
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Applications
exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find();
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Application by ID
exports.getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Application by ID
exports.updateApplication = async (req, res) => {
    try {
        const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedApplication) return res.status(404).json({ message: 'Application not found' });
        res.json(updatedApplication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Application by ID
exports.deleteApplication = async (req, res) => {
    try {
        const deletedApplication = await Application.findByIdAndDelete(req.params.id);
        if (!deletedApplication) return res.status(404).json({ message: 'Application not found' });
        res.json({ message: 'Application deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
