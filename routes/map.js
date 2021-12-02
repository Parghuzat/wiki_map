// handling the route of form submission
// Router.post('/maps/:id', (req, res) => {
//   const coords = req.body.position
// })

const express = require('express');
const router  = express.Router();

const map = function(db) {
  router.get("/:user_id/:id", (req, res) => {
    db.query(`SELECT * FROM maps JOIN markers ON maps.id = markers.map_id WHERE maps.id = $1`,[req.params.id])
      .then(async data => {
        const mapResults = await db.query(`SELECT * FROM maps WHERE (maps.user_id = $1 OR maps.user_id IS NULL);`, [req.params.user_id]);
        const currentMap = await db.query(`SELECT * FROM maps WHERE maps.id = $1 AND (maps.user_id = $2 OR maps.user_id IS NULL)`,[req.params.id, req.params.user_id]);
        console.log('REQ.PARAMS:', req.params);
        const markers = data.rows;
        const maps = mapResults.rows;
        const map = currentMap.rows[0];
        const user_id = req.params.user_id;
        res.render('map', {markers, maps, map, user_id });
        // console.log('templateVars', maps);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  router.post('/:map_id', (req, res) => {
    db.query(`INSERT INTO markers (title, lat, lng, description, image_url, map_id ) VALUES ($1, $2, $3, $4, $5, $6);`, [req.body.title, req.body.latitude, req.body.longitude, req.body.description, req.body.img_url, req.params.map_id])
      .then(async data => {
        res.redirect('back')
      })
      .catch(err => {
        res.status(500).send(err);
      })
  });

  router.post('/:user_id/:map_id/delete', (req, res) => {
    db.query(`DELETE FROM maps WHERE (user_id = $1 OR user_id IS NULL) AND maps.id = $2`, [req.params.user_id, req.params.map_id])
      .then( data => {
        res.redirect(`/maps/${req.params.user_id}`);
      })
      .catch(err => {
        res.status(500).send(err);
      })
  })
  return router;
}



module.exports = map;
