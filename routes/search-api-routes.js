const db = require("../models");

// Routes
module.exports = app => {
  // GET route for getting all of the posts
  app.get("/api/history", (req, res) => {
    const query = {};
    if (!req.user) {
      res.json({});
    } else {
      console.log("start");
      // Here we add an "include" property to our options in our findAll query
      db.Search.findAll({
        where: {
          UserId: req.user.id
        },
        limit: 50,
        order: [["createdAt", "DESC"]]
      }).then(dbSearch => {
        console.log("dbSearch");
        res.json(dbSearch);
      });
    }
  });
  // POST route for saving a new post
  app.post("/api/history", (req, res) => {
    db.Search.create({
      artist: req.body.artist,
      songTitle: req.body.songTitle,
      UserId: req.user.id
    }).then(dbSearch => {
      res.json(dbSearch);
    });
  });

  //DELETE route for deleting posts
  app.delete("/api/history", (req, res) => {
    console.log(req.body.id);
    db.Search.destroy({
      where: {
        id: req.query.id
      }
    }).then(dbSearch => {
      res.json(dbSearch);
    });
  });
};
