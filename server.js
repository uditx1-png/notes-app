const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const noteRoutes = require("./routes/note");
app.use("/api/notes", noteRoutes); 

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Test routes
app.get("/", (req, res) => {
    res.send("Server + DB running 🚀");
});

app.post("/test", (req, res) => {
    res.send("Test route working");
});

// ✅ MOVE PROFILE HERE (BEFORE LISTEN)
app.get("/profile", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: "Access granted", userId: decoded.userId });
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
});

// START SERVER (LAST)
app.listen(5000, () => {
    console.log("🔥 NEW SERVER RUNNING 🔥");
});

