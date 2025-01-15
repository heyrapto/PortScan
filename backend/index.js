const express = require("express");
const app = express();
const scraperRoutes = require("./routes/scraperRoutes");
const cors = require('cors');
const PORT = process.env.PORT || 7000;

const allowedOrigins = [
  "https://port-scan-ten.vercel.app",
  "https://port-scan-8bl6.onrender.com",
  "https://portscan-clhm.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
]
app.use(
  cors({
    exposedHeaders: ["Content-Type"],
    origin: (origin, callback) => {
      if(!origin || allowedOrigins.includes(origin))  {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
  })
)

app.options("*", cors())
app.use(express.json())
app.use("/api/scrape", scraperRoutes)
app.get("/", (req, res) => {
  res.send("API is working!")
})

app.listen(PORT, () => {
    console.log("Server is running on", PORT);
});