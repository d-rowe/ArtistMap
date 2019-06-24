# Artist Tour

![Screenshot](https://i.imgur.com/HivKefy.png)

---
- [Getting Started](#getting-started)

- [Running](#running)

- [Contributing](#contributing)
---

## Getting Started

### Install Dependencies

Run `./install.sh`. Alternatively, you can run `yarn install` in both the root and in `/src/server`.

### Getting a Songkick API key and a Mapbox public token

This project utilizes the [Songkick API](https://www.songkick.com/developer) for artist and concert data and [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/) for visualization.

If you don't have a Songkick API key you can apply for one [here](https://www.songkick.com/api_key_requests/new). If you don't have a Mapbox public token you can get one by making a Mapbox account [here](https://mapbox.com/signup).

### Storing API Keys

You'll need to supply your own Songkick key and mapbox public token.

#### Mapbox

Add your public token to `/src/client/mapboxToken.js`. It should look like the following:

```js
export const TOKEN = // YOUR MAPBOX PUBLIC TOKEN
```

#### Songkick

Add your Songkick key to `/src/server/.env`. It should look like the following:

```bash
SONGKICK_KEY = # YOUR SONGKICK API KEY
```

`mapboxToken.js` and `.env` have been added to the .gitignore, but it's probably worth the check to see if they are being ignored in your environment as to keep your key and token safe.

---

## Running

`yarn start` will start both the react app and express API server. Alternatively, you can run the react app with `yarn client` and the express API server with `yarn server`.

---

## Contributing

If you'd like contribute feel free to create a pull request.

### Higher Priority

- [x] ~~Fix bug in search causing error fetching (proxy and .env problem)~~
- [x] ~~Move songkick api calls over to backend~~
- [x] ~~Update README for .env file~~
- [x] ~~Add number of concert results to response~~
- [x] ~~Migrate from markers to a [cluster layer](https://docs.mapbox.com/mapbox-gl-js/example/cluster/)~~
- [ ] Map.js: Move getConcerts() and filterResults() to MapTools.js and migrate concert data from state to Redux to facilitate this
- [ ] Filter out concerts with missing data (coordinates, concert title, etc..)
- [ ] Update cluster style expressions to better fit data
- [ ] Add Popup on individual venue points

### Lower Priority

- [ ] Loading animation ([react-loading-overlay](https://github.com/derrickpelletier/react-loading-overlay#readme))
- [ ] Filter server data to only include salient properties (artistId, artistName, venueId, venueName, venueLocation, cityName, cityLocation, date)
- [ ] Handle api timeouts
- [ ] Popup if search found no artist matches
- [ ] Add spinner while data loads from apis
- [ ] Add songkick credits
- [ ] Create production script
- [ ] Deploy
