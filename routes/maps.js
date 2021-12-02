const express = require('express');
const router  = express.Router();

const maps = function(db) {
  router.get('/:user_id/', (req, res) => {
    db.query(`SELECT * FROM maps WHERE (maps.user_id = $1 OR maps.user_id IS NULL);`, [req.params.user_id])
      .then(data => {
        const mapsList = data.rows;
        const user_id = req.params.user_id;
        res.render('maps', { mapsList, user_id })
      })
      .catch(err => {
        console.log('ERROR!', err);
        res.status(500).send(err);
      })
  });
  router.post('/:user_id', (req, res) => {
    db.query(`INSERT INTO maps (title, center_lat, center_lng, zoom, user_id ) VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [req.body.title, req.body.latitude, req.body.longitude, 10, req.params.user_id])
    .then(async data => {
      res.redirect(`/map/${data.rows[0].user_id}/${data.rows[0].id}`)
    })
    .catch(err => {
      res.status(500).send(err);
    })
  });
  return router;
}

module.exports = maps;
