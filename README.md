# spotify dashboard

a spotify dashboard that displays your top tracks and artists as well as recently played songs. it's built with:

- [next.js](https://nextjs.org/)
- [spotify web api](https://developer.spotify.com/documentation/web-api/)
- [tailwind](https://tailwindcss.com/)

---

## set up

### spotify api

1. follow [documentation](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app) to register your spotify application. this is where you'll generate your `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`
2. white list the redirect uri you'll use. see [documentation](https://developer.spotify.com/documentation/general/guides/app-settings/#whitelist-a-redirect-uri) for more info
3. create a `.env.local` at the project root with the following:

``` js 
SPOTIFY_CLIENT_ID=YOUR_CLIENT_ID
SPOTIFY_CLIENT_SECRET=YOUR_CLIENT_SECRET
REDIRECT_URI= // redirect uri. this is a route that receives a code from the spotify api and provides a token to make subsequent api calls
SCOPE="user-read-recently-played user-top-read" // you can add scope here if you're going to fork or extend this repo
```

### nextjs

this is a pretty standard next.js project:

``` js
yarn // install dependencies
yarn dev // run in development
```

### get to the dashboard

Click the 'login' button from the index and you're off.

## motivation

i wanted to build a weekly aggregator that gave you up(to-date / dated) information on your spotify play history. however, the [recently played](https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-recently-played) endpoint provided only returns the *latest* 50 songs. in the meantime, i wanted to experiment with tialwind and react's context api, so i built this dashboard. here's hoping that a new version of that endpoint gets released in the future.
