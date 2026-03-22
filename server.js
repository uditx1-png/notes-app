const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const allowedOrigins = ["http://localhost:3000", process.env.FRONTEND_URL].filter(Boolean);
app.use(cors({ origin: allowedOrigins, credentials: true }));
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

app.get("/", (req, res) => res.send("Notes API running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

