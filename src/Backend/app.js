const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json());

// ---  here the total  DB Connection withb app  ---
connectDB();

// --- all  Routes  are ---
app.use('/api/users', userRoutes);

// --- for testing -- Test Route ---
app.get('/api', (req, res) => {
    res.json({ message: "Backend is working! 🚀" });
});

// Here is my  Root Route ---
app.get('/', (req, res) => {
    res.send('Backend API is running!');
});

module.exports = app;
