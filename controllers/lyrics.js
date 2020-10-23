const solenolyrics = require("solenolyrics");
const getlyrics = async (req, res) => {
  const title = req.query.title;
  const artist = req.query.artist;
  try {
    const lyrics = await solenolyrics.requestLyricsFor(title + artist);
    return res.json(lyrics);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = { getlyrics };
