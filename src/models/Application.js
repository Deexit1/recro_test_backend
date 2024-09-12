const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    department: { type: String, required: true },
    status: { type: String, required: true },
    applicationDate: { type: Date, default: Date.now },
    salary: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
