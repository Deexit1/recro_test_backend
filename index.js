const express = require('express');
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const candidateRoutes = require('./src/routes/candidateRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const applicationRoutes = require('./src/routes/applicationRoutes');
const cors = require('cors');

const app = express();
const port = 3000;

connectDB();

// Middleware to parse request bodies
app.use(cors());
app.use(express.json());



app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/applications', applicationRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});