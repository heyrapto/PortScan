const express = require("express");
const app = express();
const scraperRoutes = require("./routes/scraperRoutes");
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 7000;

app.use(cors());
dotenv.config();

const allowedOrigins = [
  "https://port-scan-ten.vercel.app",
  "https://port-scan-8bl6.onrender.com",
  "https://portscan-clhm.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(express.urlencoded({ extended: true })); 
app.use(express.json())
app.use("/api/scrape", scraperRoutes)
app.get("/", (req, res) => {
  res.send("API is working!")
})

app.listen(PORT, () => {
    console.log("Server is running on", PORT);
});