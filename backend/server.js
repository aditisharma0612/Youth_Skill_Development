const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./database");
console.log("✅ connectDB function loaded in server.js:", typeof connectDB);
 // Import MongoDB Connection

const app = express();
const PORT = process.env.PORT || 5000;




const corsOptions = {
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"], // Allow both 127.0.0.1 and localhost
    methods: "GET,POST",
    allowedHeaders: "Content-Type"
};

app.use(cors(corsOptions));






// ✅ Connect to MongoDB
connectDB()
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Debugging message for server start
app.get("/", (req, res) => {
    res.send("✅ SkillBridge Backend Running & MongoDB Connected...");
});

// ✅ Define User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
    
});
const User = mongoose.model("User", UserSchema);

// ✅ Register User API
app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password ) {
        return res.status(400).json({ message: "❌ All fields are required!" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "❌ Email already registered!" });
        }

        const newUser = new User({ name, email, password});
        await newUser.save();
        res.json({ message: "✅ Registration successful!" });
    } catch (error) {
        console.error("❌ Error during registration:", error);
        res.status(500).json({ message: "❌ Server error!" });
    }
});

// ✅ Login API
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && user.password === password) {
            res.json({ message: "✅ Login successful!", user });
        } else {
            res.status(401).json({ message: "❌ Invalid email or password!" });
        }
    } catch (error) {
        console.error("❌ Error during login:", error);
        res.status(500).json({ message: "❌ Server error!" });
    }
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));




