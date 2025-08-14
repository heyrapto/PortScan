const express = require("express");
const app = express();
const scraperRoutes = require("./routes/scraperRoutes");
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./middleware/rateLimiter");
dotenv.config();

const PORT = 7000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(rateLimiter);

app.use("/api/scrape", scraperRoutes);
app.get("/", (req, res) => {
  res.send("API is working!");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});