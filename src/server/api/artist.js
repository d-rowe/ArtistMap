const fetch = require("node-fetch");
const pick = require("lodash.pick");
require("dotenv").config({ path: __dirname + "/../.env" });
const KEY = process.env.SONGKICK_KEY;

// Send response of artist name and id found on the songkick API
module.exports = getArtist = (res, artistName) => {
  fetch(
    `https://api.songkick.com/api/3.0/search/artists.json?apikey=${KEY}&query=${artistName}&per_page=5`
  )
    .then(response => response.json())
    .then(data => {
      try {
        const artistResults = data.resultsPage.results.artist;
        let suggestions = [];
        artistResults.forEach(artistResult => {
          const suggestion = pick(artistResult, ["displayName", "id"]);
          suggestions.push({ name: suggestion.displayName, id: suggestion.id });
        });
        // console.log(suggestions);
        // const artistData = pick(data.resultsPage.results.artist[0], [
        //   "displayName",
        //   "id"
        // ]);
        res.send(suggestions);
      } catch {
        res.status(400).send("No artist match");
      }
    });
};
