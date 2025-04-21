require("dotenv").config(); // Load environment variables
const authRoutes = require('./routes/auth/auth-routes');
const profileRoutes = require('./routes/profile/profile-router');
const postRoutes = require('./routes/post/post-routes');
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cookieParser()); // Add cookie-parser middleware

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads/profiles');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure CORS to allow credentials
app.use(
  cors({
    origin: ["http://localhost:5174"], // Allow both frontend URLs
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // This is important for cookies
    exposedHeaders: ["set-cookie"]
  })
);

// Connect to MongoDB (Ensure MONGO_URI is in .env file)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Connection Error:", err.message));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/profiles', profileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong!'
  });
});

// **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));




