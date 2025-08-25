const express = require("express");
const path = require("path");
const todoRoutes = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// CORS for demo (allow frontend to call API)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Serve static files (our HTML interface)
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api/todos", todoRoutes);

// Basic health check
app.get("/", (req, res) => {
  res.json({ message: "Todo API is running!!!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
