const Department = require('../models/Department');

// Create Department
exports.createDepartment = async (req, res) => {
    try {
        const department = new Department(req.body);
        await department.save();
        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Departments
exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Department by ID
exports.getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) return res.status(404).json({ message: 'Department not found' });
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Department by ID
exports.updateDepartment = async (req, res) => {
    try {
        const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDepartment) return res.status(404).json({ message: 'Department not found' });
        res.json(updatedDepartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Department by ID
exports.deleteDepartment = async (req, res) => {
    try {
        const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
        if (!deletedDepartment) return res.status(404).json({ message: 'Department not found' });
        res.json({ message: 'Department deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
