const Application = require("../models/Application");
const Candidate = require("../models/Candidate");
const moment = require('moment');

const calculatePercentageDifference = (current, previous) => {
    if (previous === 0) return current === 0 ? 0 : 100;
    return ((current - previous) / previous) * 100;
};

const dashboardCards = async (req, res) => {
    try {
        const result = await Application.aggregate([
            {
                $group: {
                    _id: null,
                    averageSalary: { $avg: "$salary" }
                }
            }
        ]);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "No salary data found" });
        }
        const openPositions = await Application.countDocuments({ status: 'open' });

        // Get current and previous months
        const currentMonthStart = moment().startOf('month').toDate();
        const previousMonthStart = moment().subtract(1, 'month').startOf('month').toDate();
        const previousMonthEnd = moment().subtract(1, 'month').endOf('month').toDate();

        // Get Candidate Stats
        const currentMonthCandidates = await Candidate.countDocuments({ createdAt: { $gte: currentMonthStart } });
        const previousMonthCandidates = await Candidate.countDocuments({
            createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd }
        });
        const candidatePercentageDifference = calculatePercentageDifference(currentMonthCandidates, previousMonthCandidates);

        // Get Application Stats
        const currentMonthApplications = await Application.countDocuments({ createdAt: { $gte: currentMonthStart } });
        const previousMonthApplications = await Application.countDocuments({
            createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd }
        });
        const applicationPercentageDifference = calculatePercentageDifference(currentMonthApplications, previousMonthApplications);


        res.status(200).json({
            averageSalary: result[0].averageSalary,
            totalCandidates: {
                count: currentMonthCandidates,
                percentageDifference: candidatePercentageDifference
            },
            openPositions,
            totalApplications: {
                count: currentMonthApplications,
                percentageDifference: applicationPercentageDifference
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { dashboardCards };