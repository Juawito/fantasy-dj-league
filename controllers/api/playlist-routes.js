const router = require('express').Router();
const {Playlist, User} = require('../../models');


router.post('/add', async (req, res) => {
try {
    const newPlaylist = await Playlist.create(req.body);
    res.status(200).json(newPlaylist);
} catch (error) {
    res.status(500).json(error);
}    
})
router.delete('/:id', async (req, res) => {
    try {
      const deletePlaylist = await Playlist.destroy({
        where: {
          id: req.params.id,
        }
      })
      res.status(200).json(deletePlaylist);
    } catch (error) {
      res.status(400).json(error);
    }
  })

module.exports = router;