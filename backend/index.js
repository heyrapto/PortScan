const express = require("express");
const app = express();
const scraperRoutes = require("./routes/scraperRoutes");
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 7000;

app.use(express.urlencoded({ extended: true })); 
app.use(express.json())

app.use(cors());

const allowedOrigins = [
  "https://port-scan-ten.vercel.app",
  "https://port-scan-8bl6.onrender.com",
  "http://localhost:5173",
];

app.use("/api/scrape", scraperRoutes)
app.get("/", (req, res) => {
  res.send("API is working!")
})

app.listen(PORT, () => {
    console.log("Server is running on", PORT);
});
