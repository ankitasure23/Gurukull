require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./database/db');

const PORT = process.env.PORT || 5000;
connectDB();

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(` Backend server running on http://localhost:${PORT}`);
});
