const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const schemeRoutes = require('./routes/schemeRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/schemes', schemeRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Government Scheme API is running!' });
});

app.get('/test-db', async (req, res) => {
    const sequelize = require('./config/database');
    try {
        await sequelize.authenticate();
        res.json({ message: 'Database connected successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
});

module.exports = app;