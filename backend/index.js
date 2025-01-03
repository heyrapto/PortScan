const express = require("express");
const app = express();
const scraperRoutes = require("./routes/scraperRoutes");
const cors = require('cors');
const PORT = "https://port-scan-backend.vercel.app";

app.use(express.json())
app.use("/api/scrape", scraperRoutes)
app.use(cors());
app.options("api/scrape", cors())


app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
})

