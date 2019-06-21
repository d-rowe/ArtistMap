require("dotenv").config({ path: __dirname + "/../.env" });
const fetch = require("node-fetch");
const KEY = process.env.SONGKICK_KEY;

// TODO: add number of concert results to response

// To be populated asynchronously as api responses come in
let pageResults = [];

// Send response of concert array found on the songkick API
module.exports = getConcerts = (res, artistId) => {
  // Reset pageResults so they can be repopulated
  pageResults = [];
  // Fetch first page to figure out how many pages we will have to retrieve
  fetch(apiUrl(1, artistId))
    .then(response => response.json())
    .then(data => {
      const numPages = Math.ceil(
        data.resultsPage.totalEntries / data.resultsPage.perPage
      );
      // Send over first page to populate pageResults
      compileResponse(res, numPages, data);
      // Recursively fetch the remaining pages
      for (let i = 2; i <= numPages; i++) {
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
  // Add new item for each page to pageResults
  pageResults.push(data.resultsPage.results.event);
  if (pageResults.length === numPages) {
    res.send(processResponse(pageResults))
  }
};

// TODO: Filter out non-salient properties
// Spread all concerts in one array
const processResponse = (pageResults) => {
  let output = [];
  for (let i = 0; i < pageResults.length; i++) {
    let currentPage = pageResults[i];
    output.push(...currentPage);
  }
  return output;
}
