require("dotenv").config({ path: __dirname + "/.env" });
const fetch = require("node-fetch");
const KEY = process.env.SONGKICK_KEY;

// To be populated asynchronously as api responses come in
var apiResults = [];

// Send response of concert array found on the songkick API
module.exports = getConcerts = (res, artistId) => {
  // Reset apiResults so they can be repopulated
  apiResults = [];
  // Fetch first page to figure out how many pages we will have to retrieve
  fetch(apiUrl(1, artistId))
    .then(response => response.json())
    .then(data => {
      const numPages = Math.ceil(
        data.resultsPage.totalEntries / data.resultsPage.perPage
      );
      // Send over first page to populate apiResults
      compileResponse(res, numPages, data);
      // Recursively fetch the remaining pages
      for (var i = 2; i <= numPages; i++) {
        fetch(apiUrl(1, artistId))
          .then(response => response.json())
          .then(data => {
            compileResponse(res, numPages, data);
          });
      }
    });
};

const apiUrl = (pageNum, artistId) => {
  return `https://api.songkick.com/api/3.0/artists/${artistId}/gigography.json?apikey=${KEY}&page=${pageNum}`;
};

const compileResponse = (res, numPages, data) => {
  // Add new item for each page to apiResults
  apiResults.push(data.resultsPage.results.event);
  if (apiResults.length === numPages) {
    res.send(processResponse(apiResults))
  }
};

// Spread all concerts in one array
// TODO: Filter out non-salient properties
const processResponse = (apiResults) => {
  var output = [];
  for (var i = 0; i < apiResults.length; i++) {
    var currentPage = apiResults[i];
    output.push(...currentPage);
  }
  return output;
}
