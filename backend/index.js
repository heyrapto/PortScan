const express = require("express");
const app = express();
const scraperRoutes = require("./routes/scraperRoutes");
const cors = require('cors');
const PORT = 7000 || "https://port-scan-backend.vercel.app";

app.use(express.json())
app.use("/api/scrape", scraperRoutes)
app.use(cors({
  origin: "https://port-scan-ten.vercel.app",  // Allow local frontend (or other domains you're working with)
  methods: ["GET", "POST"],  // Adjust based on your needs
  allowedHeaders: ["Content-Type"],  // Headers your app might need
}));


app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
})

