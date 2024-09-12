const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    skills: [{ type: String, required: true }],
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    department: { type: String, required: true },
    status: { type: String, required: true },
    applicationDate: { type: Date, default: Date.now },
    hireDate: { type: Date, default: Date.now }
}, { timestamps: true });

candidateSchema.index({ name: "text", location: "text", email: "text", skills: "text" });
candidateSchema.index({ skills: 1 });

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
