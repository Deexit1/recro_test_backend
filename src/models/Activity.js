const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user: { type: String, required: true },
    action: { type: String, required: true },
    department: { type: String },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
