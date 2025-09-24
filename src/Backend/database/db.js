const mongoose = require('mongoose');

const connectDB = async () => {
try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
    await mongoose.connect(mongoURI);
    console.log(' MongoDB connected successfully!');
} 
catch (err) {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
}
};

module.exports = connectDB;
