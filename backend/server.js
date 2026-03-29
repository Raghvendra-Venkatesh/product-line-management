const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Simple, permissive CORS to bypass the block for now
app.use(cors({
  origin: true, // Allows any origin
  credentials: true,
}));
app.use(express.json());

// =======================
// MongoDB Connection
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    // Don't crash the server, just log the error
  });

// =======================
// Routes
// =======================
app.get("/", (req, res) => {
  res.send("Product Line Management Backend Running");
});

app.get("/health", (req, res) => {
  res.json({ status: "Backend is running fine" });
});

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));



// =======================
// Global Error Handler (optional but good)
// =======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
