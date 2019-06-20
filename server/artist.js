const fetch = require("node-fetch");
const pick = require("lodash.pick");
require("dotenv").config();
const KEY = process.env.SONGKICK_KEY;

// Send response of artist name and id found on the songkick API
module.exports = getArtist = (res, artistName) => {
  fetch(
    `https://api.songkick.com/api/3.0/search/artists.json?apikey=${KEY}&query=${artistName}&per_page=1`
  )
    .then(response => response.json())
    .then(data => {
      try {
        const artistData = pick(data.resultsPage.results.artist[0], [
          "displayName",
          "id"
        ]);
        res.send(artistData);
      } catch {
        res.status(400).send("No artist match");
      }
    });
};
