# Interactive Tour Map

### Map of artists' tour locations

## Setup

### Install dependencies
Run `yarn install` in `./` and in `/server` to install dependencies for the client and server.

### API Keys
After you have the depencies installed you'll need to supply your own mapbox token and songkick key. To do so create a file named `token.js` in `/src/` and supply your api token as following:

```js
export const TOKEN = // YOUR MAPBOX TOKEN
export const KEY = // YOUR SONGKICK API KEY
```

You'll need to create a .env file in /server with your songkick key set to SONGKICK_KEY. ./server/.env should look like the following:

```
SONGKICK_KEY = // YOUR SONGKICK API KEY
```

### MAKE SURE TO ADD token.js and .env to your .gitignore to protect your keys

If you don't have a Mapbox token you'll can sign up for one by making a Mapbox account [here](https://mapbox.com/signup). If you don't have a songkick api key you can apply for one [here](https://www.songkick.com/api_key_requests/new).

Then you can run `yarn start` to get the project up and running.

### TODO

- [ ] Fix bug in search causing error fetching
- [ ] Move all api calls over to backend and remove token.js instructions
- [ ] Popup if search found no artist matches
- [ ] Add spinner while data loads from apis
- [ ] Update README for .env file, move away from token.js
- [ ] Handle api timeouts
- [ ] Filter out concerts with missing data (coordinates, venue name, etc..)
- [ ] Create production script
- [ ] Deploy
