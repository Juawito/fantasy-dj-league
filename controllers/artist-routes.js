const router = require('express').Router();
const sequelize = require('../config/connection');
const Artist = require('../models/Artist');

router.get('/', async (req, res) => {
  
  
  
  
  
  
  
  // TODO: Build out this route so that it serializes all of the artist objects that it receives. See the 'get' route below for a hint.
const artistData = await Artist.findAll().catch((err) => {

  Response.JSON(err)
});
const artists = artistData.map((artist) => artist.get({plain:true}))

res.render('all', { artists});

});







// route to get one artist
router.get('/artist/:id', async (req, res) => {
  try{ 
      const artistData = await Artist.findByPk(req.params.id);
      if(!artistData) {
          res.status(404).json({message: 'No artist with this id!'});
          return;
      }
      const artist = artistData.get({ plain: true });
      res.render('artist', artist);
    } catch (err) {
        res.status(500).json(err);
    };     
});

module.exports = router;
