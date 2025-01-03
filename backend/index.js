const express = require("express");
const app = express();
const scraperRoutes = require("./routes/scraperRoutes");
const cors = require('cors');
const PORT = process.env.PORT || 7000;

app.use(cors({
  origin: ["https://port-scan-ten.vercel.app", "http://localhost:7000"],
  methods: ["POST", "GET"],
}));

const allowedOrigins = [
  "https://port-scan-ten.vercel.app", 
  "http://localhost:5173",
]
app.use(
  cors({
    origin: (origin, callback) => {
      if(!origin || allowedOrigins.includes(origin))  {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST", "GET"]
  })
)

app.use(express.json())
app.use("/api/scrape", scraperRoutes)
app.get("/", (req, res) => {
  res.send("API is working!")
})

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});