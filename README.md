## Artist Map

Map of artists' tour locations

## Setup

 Run a `yarn install` to install dependencies.

After you have the depencies installed you'll need to supply your own mapbox token and songkick key. To do so create a file named `token.js` in `/src/` and supply your api token as following:

```js
export const TOKEN = // YOUR MAPBOX TOKEN
export const KEY = // YOUR SONGKICK API KEY
```

If you don't have a Mapbox token you'll can sign up for one by making a Mapbox account [here](https://mapbox.com/signup). If you don't have a songkick api key you can apply for one [here](https://www.songkick.com/api_key_requests/new).

Then you can run `yarn start` to get the project up and running.

I know this isn't the best solution, but until I have a node backend handle API calls this will do.