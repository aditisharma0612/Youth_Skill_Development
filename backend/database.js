
const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/skillbridge";

// ✅ Debugging: Ensure this file executes
console.log("📌 database.js is executing... ✅");
console.log(`📌 Attempting to connect to MongoDB at: ${MONGO_URI}`);

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);// ✅ Proper MongoDB connection
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit if MongoDB connection fails
    }
};

module.exports = connectDB; // ✅ Correctly exporting connectDB
