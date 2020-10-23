const SpotifyWebApi = require("spotify-web-api-node");
const { SPOTIFY_ID, SPOTIFY_SECRET } = process.env;

if (!SPOTIFY_ID || !SPOTIFY_SECRET) {
  console.log("missing spotify credentials");
  process.exit(1);
}

const retrieveAccessToken = async () => {
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body["access_token"]);
};

const searchSpotifyForTrack = async (query) => {
  try {
    const searchResults = await spotifyApi.searchTracks(query, { limit: 1 });
    return searchResults;
  } catch (error) {
    if (error.statusCode && error.statusCode === 401) {
      await retrieveAccessToken();
      return searchSpotifyForTrack(query);
    }
    throw error;
  }
};

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET
});

const searchTracks = async (req, res) => {
  const { song } = req.query;
  try {
    if (!song) {
      res.status(400).json({ message: "Missing song parameter." });
    } else {
      const spotifyResults = await searchSpotifyForTrack(`track:${song}`);
      res.json({ items: spotifyResults.body.tracks.items });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = { searchTracks };
