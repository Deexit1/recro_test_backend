const Candidate = require('../models/Candidate');

// List all candidates with search and filter options
exports.listCandidates = async (req, res) => {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering using greater than, less than
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = Candidate.find(JSON.parse(queryStr));

    // Search functionality for names and skills
    if (req.query.search) {
        let pattern = '.*' + req.query.search + '.*';
        query = Candidate.find({
            $or: [
                { name: { $regex: new RegExp(pattern, 'i') } },
                { skills: { $in: [new RegExp(pattern, 'i')] } } // Updated line
            ]
        });
    }


    // Sorting results
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // Field limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    try {
        const candidates = await query;
        console.log(candidates);

        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Create a new candidate
exports.createCandidate = async (req, res) => {
    try {
        const newCandidate = new Candidate(req.body);
        await newCandidate.save();
        res.status(201).json(newCandidate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Retrieve a specific candidate
exports.getCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing candidate
exports.updateCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a candidate
exports.deleteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(204).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get monthly hires
exports.getMonthlyHires = async (req, res) => {
    try {
        const monthlyHires = await Candidate.aggregate([
            {
                // Match any records where hireDate exists
                $match: {
                    hireDate: { $exists: true }
                }
            },
            {
                // Group by year and month of hireDate
                $group: {
                    _id: {
                        year: { $year: "$hireDate" },
                        month: { $month: "$hireDate" }
                    },
                    count: { $sum: 1 }  // Count the number of hires
                }
            },
            {
                // Sort by year and month
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);

        // Formatting the response to be more readable for the frontend (e.g., for graphing libraries)
        const formattedData = monthlyHires.map(item => ({
            month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,  // Format as "YYYY-MM"
            hires: item.count
        }));

        res.status(200).json(formattedData);
    } catch (err) {
        console.error('Error fetching monthly hires:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
