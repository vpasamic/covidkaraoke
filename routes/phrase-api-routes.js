const db = require("../models");

module.exports = (app) => {
  // GET route for getting all of the phrases
  app.get("/api/phrases", (req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }

    db.Phrase.findAll({
      where: query,
      include: [db.User]
    }).then((dbPhrase) => {
      res.render("members", { dbPhrase: data });
    });
  });

  app.get("/api/phrases/:id", (req, res) => {
    db.Phrase.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then((dbPhrase) => {
      res.json(dbPhrase);
    });
  });

  // Phrase route for saving a new Phrase
  app.post("/api/phrases", (req, res) => {
    db.Phrase.create(req.body).then((dbPhrase) => {
      res.json(dbPhrase);
    });
  });

  // DELETE route for deleting phrases
  app.delete("/api/phrases/:id", (req, res) => {
    db.Phrase.destroy({
      where: {
        id: req.params.id
      }
    }).then((dbPhrase) => {
      res.json(dbPhrase);
    });
  });

  // PUT route for updating phrases
  app.put("/api/phrases", (req, res) => {
    db.Phrase.update(req.body, {
      where: {
        id: req.body.id
      },
    }).then((dbPhrase) => {
      res.json(dbPhrase);
    });
  });
};
