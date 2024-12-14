const express = require("express");
const app = express();
const cors = require("cors");
const scraperRoutes = require("./routes/scraperRoutes");
const validateURl = require("./middleware/validateUrl");

const errorHandler = require("./middleware/errorHandler");
const PORT = 3500;

app.use(cors())
app.use(express.json())
app.use("/", validateURl, scraperRoutes)

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
})