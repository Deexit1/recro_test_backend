const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    budget: { type: Number, required: true },
    hires: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
