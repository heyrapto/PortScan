const express = require("express");
const app = express();
const scraperRoutes = require("./routes/scraperRoutes");
const PORT = 7000 | "https://port-scan-backend.vercel.app";

app.use(express.json())
app.use("/api/scrape", scraperRoutes)

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
})

