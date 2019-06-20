require("dotenv").config({ path: __dirname + "/.env" });
const fetch = require("node-fetch");
// const pick = require("lodash.pick");
const KEY = process.env.SONGKICK_KEY;
var completeConcerts = [];
// Send response of concert array found on the songkick API
module.exports = getConcerts = (res, artistId) => {
  completeConcerts = [];
  fetch(
    `https://api.songkick.com/api/3.0/artists/${artistId}/gigography.json?apikey=${KEY}&page=1`
  )
    .then(response => response.json())
    .then(data => {
      const numPages = Math.ceil(
        data.resultsPage.totalEntries / data.resultsPage.perPage
      );
      for (var i = 1; i <= numPages; i++) {
        console.log(i);
      }
      reduceSend(res, numPages, data);
    });
};

// Get first result
// Find how many pages
// Recursively fetch and send callback

const reduceSend = (res, numPages, data) => {
  completeConcerts.push(data.resultsPage.results.event);
  res.send(completeConcerts);
  // if (completeConcerts.length === numPages) {
  // }
};
