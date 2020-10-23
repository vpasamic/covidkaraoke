require("dotenv").config();
// Requiring necessary npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");

//Require APIS
const spotifyApiController = require("./controllers/spotify-api");
const soleno = require("./controllers/lyrics")

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

if (!process.env.SERVER_SECRET) {
  console.log("Missing SERVER_SECRET env variable. Shutting down.");
  process.exit(1);
}
// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: process.env.SERVER_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/search-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
app.get("/api/search/songs", spotifyApiController.searchTracks);
app.get("/api/lyrics", soleno.getlyrics)

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
