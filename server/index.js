const express = require("express");
const app = express();
const getArtist = require("./artist");

app.get("/api/artist", (req, res) => {
  getArtist(res, req.query.artistName);
});

app.listen(5000);
