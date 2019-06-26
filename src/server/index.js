const express = require("express");
const app = express();
const getArtist = require("./api/artist");
const getConcerts = require("./api/concerts");
require("dotenv").config();

app.get("/api/artist", (req, res) => {
  getArtist(res, req.query.artistName);
});

app.get("/api/concerts", (req, res) => {
  getConcerts(res, req.query.artistId);
});

// Serve build files if in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  // Serve the static files from the React app
  app.use(express.static(path.join(__dirname, "../../build")));
  // Handles any requests that don't match the ones above
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../../build/index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
