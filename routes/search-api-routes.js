const db = require("../models");

// Routes
module.exports = app => {
  // GET route for getting all of the posts
  app.get("/api/history", (req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    console.log("start");
    // Here we add an "include" property to our options in our findAll query
    db.Search.findAll({
      where: query,
      include: [db.User]
      // limit: 50,
      // order: [["createdAt", "DESC"]]
    }).then(dbSearch => {
      console.log("dbSearch");
      res.json(dbSearch);
    });
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // POST route for saving a new post
  app.post("/api/history", (req, res) => {
    db.Search.create(req.body).then(dbSearch => {
      res.json(dbSearch);
    });
  });

  // DELETE route for deleting posts
  // app.delete("/api/history", (req, res) => {
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     },
  //   }).then((dbSearch) => {
  //     res.json(dbSearch);
  //   });
  // });
};
