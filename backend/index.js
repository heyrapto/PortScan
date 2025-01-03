const express = require("express");
const app = express();
const scraperRoutes = require("./routes/scraperRoutes");
const cors = require('cors');
const PORT = process.env.PORT || 7000;

app.use(express.json())
app.use("/api/scrape", scraperRoutes)
app.use(cors());
app.options("api/scrape", cors());

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
})

