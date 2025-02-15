const mongoose = require("mongoose");

const MONGO_URI = "mongodb://127.0.0.1:27017/skillbridge"; // Use the same URL from .env

console.log("📌 Attempting to connect to MongoDB...");

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("✅ MongoDB Connected Successfully!");
        process.exit(0);  // Exit the script if successful
    })
    .catch((error) => {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);  // Exit with an error code
    });
