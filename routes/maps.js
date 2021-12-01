// handling the route of form submission
// Router.post('/maps/:id', (req, res) => {
//   const coords = req.body.position
// })

const express = require('express');
const router  = express.Router();

const map = function(db) {
  router.get("/map/:id", (req, res) => {
    db.query(`SELECT * FROM maps JOIN markers ON maps.id = markers.map_id WHERE id = $1`,[req.params.id])
      .then(data => {
        const templateVars = data.rows;
        res.render('index', templateVars);
        console.log('templateVars', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
}

const maps = function(db) {
  router.get("/maps", (req, res) => {
    db.query(`SELECT * FROM maps`)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
}


module.exports = {
  map,
  maps,
  testRoute
};
