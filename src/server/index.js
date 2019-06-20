const express = require("express");
const app = express();
const getArtist = require("./grabbers/artist");
const getConcerts = require("./grabbers/concerts");

app.get("/api/artist", (req, res) => {
  getArtist(res, req.query.artistName);
});

app.get("/api/concerts", (req, res) => {
  getConcerts(res, req.query.artistId);
});

app.listen(5000);
