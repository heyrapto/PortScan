const express = require("express");
const app = express();
const scraperRoutes = require("./routes/scraperRoutes");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./middleware/rateLimiter");

const PORT = process.env.PORT || 7000;

const allowedOrigins = [
  "https://port-scan-ten.vercel.app",
  "https://port-scan-8bl6.onrender.com",
  "http://localhost:5173",
];

// Middlewares
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(rateLimiter);

// Routes
app.use("/api/scrape", scraperRoutes);
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});