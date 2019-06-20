# Interactive Tour Map

![Screenshot](https://i.imgur.com/5nMuaXe.png)

## Setup

### Install dependencies

Run `./install.sh`. Alternatively, you can run `yarn install` in both `./` and in `/server`.

### Getting a Songkick key and Mapbox token

This project utilizes the [Songkick API](https://www.songkick.com/developer) for artist and concert data and [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/) for visualization.

If you don't have a songkick api key you can apply for one [here](https://www.songkick.com/api_key_requests/new). If you don't have a Mapbox public token you'll can sign up for one by making a Mapbox account [here](https://mapbox.com/signup).

### Storing API Keys

You'll need to supply your mapbox public token. Create a file named `mapboxToken.js` in `./src/client/` and supply your api token as following:

```js
export const TOKEN = // YOUR MAPBOX PUBLIC TOKEN
```

You'll need to create a `.env` file in `/server` with your songkick key set to SONGKICK_KEY. `./src/server/.env` should look like the following:

```
SONGKICK_KEY = // YOUR SONGKICK API KEY
```

`token.js` and `.env` have been added to the .gitignore, but it's probably worth the check to see if they are being ignored in your environment to keep your precious songkick key safe.

## Running

`yarn start` will start both the react app and express API server. Alternatively, you can run the react app with `yarn client` and the express API server with `yarn server`.

## TODO

- [x] ~~Fix bug in search causing error fetching (proxy and .env problem)~~
- [x] ~~Move songkick api calls over to backend~~
- [x] ~~Update README for .env file~~
- [x] ~~Add number of concert results to response~~
- [ ] Filter out concerts with missing data (coordinates, venue name, etc..)
- [ ] See why concerts api returns even # of concerts (not grabbing last page?, grabbing a page twice?)
- [ ] Respond with only salient data from the backend (artistId, artistName, venueId, venueName, venueLocation, cityName, cityLocation, date)
- [ ] Handle api timeouts
- [ ] Popup if search found no artist matches
- [ ] Add spinner while data loads from apis
- [ ] Create production script
- [ ] Deploy
