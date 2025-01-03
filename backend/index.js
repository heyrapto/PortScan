const express = require("express");
const app = express();
const cors = require("cors");
const scraperRoutes = require("./routes/scraperRoutes");
const validateURl = require("./middleware/validateUrl");

const errorHandler = require("./middleware/errorHandler");
const PORT = 7000 | "https://port-scan-backend.vercel.app";

app.use(
    cors({
      origin: "https://port-scan-ten.vercel.app",  // Allow only this frontend domain
      allowedHeaders: ["Content-Type"],  // Allow specific headers
      methods: ["GET", "POST", "OPTIONS"], // Allow specific methods (OPTIONS is for preflight request)
      credentials: false,  // Set to true if you're using cookies or authentication tokens
    })
  );
app.options("*", cors());
app.use(express.json())
app.use("/api/scrape", scraperRoutes)

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
})

