const router = require('express').Router();
const Player = require('../models/Player');
// route to get all playeres
router.get('/', async (req, res) => {
    // We find all players in the db and set the data equal to playerData
    const playerData = await Player.findAll().catch((err) => { 
      res.json(err);
    });
    // We use map() to iterate over playerData and then add .get({ plain: true }) each object to serialize it. 
    const players = playerData.map((player) => player.get({ plain: true }));
    // We render the template, 'all', passing in players, a new array of serialized objects.
    res.render('homepage', { players });
    });
// route to get one player
router.get('/player/:id', async (req, res) => {
  try{ 
      const playerData = await Player.findByPk(req.params.id);
      if(!playerData) {
          res.status(404).json({message: 'No player with this id!'});
          return;
      }
      const player = playerData.get({ plain: true });
      res.render('player', player);
    } catch (err) {
        res.status(500).json(err);
    };     
});
module.exports = router;
