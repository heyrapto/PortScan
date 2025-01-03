const express = require("express");
const app = express();
const scraperRoutes = require("./routes/scraperRoutes");
const cors = require('cors');
const PORT = process.env.PORT || 7000;

app.use(cors({
  origin: "https://portscan-clhm.onrender.com",
  methods:["POST", "GET"]
}));

app.use(express.json())
app.use("/api/scrape", scraperRoutes)
app.get("/", (req, res) => {
  res.send("API is working!")
})

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});