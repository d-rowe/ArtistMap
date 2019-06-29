# Artist Tour

Explore band gigographies. Created with Mapbox, React, Redux, Songkick API, and Express.

Demo @ [https://artistmap.herokuapp.com](https://artistmap.herokuapp.com).

![Screenshot](https://i.imgur.com/jjsSxn1.png)

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

Add your public token to `/src/client/config.js`. It should look like the following:

```js
export const MAPBOX_TOKEN = // YOUR MAPBOX PUBLIC TOKEN
```

#### Songkick

Add your Songkick key to `/src/server/.env`. It should look like the following:

```bash
SONGKICK_KEY = # YOUR SONGKICK API KEY
```

`config.js` and `.env` have been added to the .gitignore, but it's probably worth the check to see if they are being ignored in your environment as to keep your key and token safe.

---

## Running

`yarn dev` will start both the react app and express API server. Alternatively, you can run the react app with `yarn client` and the express API server with `yarn server`.

---

## Contributing

If you'd like contribute feel free to create a pull request.

### Higher Priority

- [x] ~~Fix bug in search causing error fetching (proxy and .env problem)~~
- [x] ~~Move songkick api calls over to backend~~
- [x] ~~Update README for .env file~~
- [x] ~~Add number of concert results to response~~
- [x] ~~Migrate from markers to a [cluster layer](https://docs.mapbox.com/mapbox-gl-js/example/cluster/)~~
- [x] ~~Update cluster style expressions to better fit data~~
- [x] ~~Fallback to city coordinates if no venue coordinate data~~
- [x] ~~Concert API to return geojson data instead of concert array~~
- [x] ~~Deployment for demo~~
- [x] ~~Search suggestions~~
- [ ] Grab more search suggestions (25?), only send the most popular 5 back to client
- [ ] Loading animation
- [ ] Popup if search found no artist matches
- [ ] Handle api timeouts (migrate from fetch to axios)

### Lower Priority

- [x] ~~Filter server data to only include salient properties (artistId, artistName, venueId, venueName, venueLocation, cityName, cityLocation, date)~~
- [ ] Add Popup on individual venue points
- [ ] Add songkick credits
- [ ] Create production script
