const db = require("../models");

// Routes
module.exports = (app) => {
  // GET route for getting all of the posts
  app.get("/api", (req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    db.Post.findAll({
      where: query,
      include: [db.User]
    }).then((dbSearch) => {
      res.json(dbSearch);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/history/:id", (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then((dbSearch) => {
      res.json(dbSearch);
    });
  });

  // POST route for saving a new post
  app.post("/api/history", (req, res) => {
    db.Post.create(req.body).then((dbSearch) => {
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

  // PUT route for updating posts
  app.put("/api/history", (req, res) => {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then((dbSearch) => {
      res.json(dbSearch);
    });
  });
};
