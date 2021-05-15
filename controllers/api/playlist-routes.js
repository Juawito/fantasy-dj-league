const router = require('express').Router();
const { Playlist, User } = require('../../models');
const withAuth = require('../../utils/withAuth');
const addCount = require('../../utils/addCount');
const sequelize = require('../../config/connection');

router.post('/add', async (req, res) => {
  try {
    const newPlaylist = await Playlist.create(req.body);
    res.status(200).json(newPlaylist);
  } catch (error) {
    res.status(500).json(error);
  }
})
router.put('/count', withAuth, async (req, res) => {
  try {
    const updateCount = await Playlist.update(
      { count: sequelize.literal(' count + 1')},
      { where: { playlistName: req.body.playlistName}}
    )
    res.status(200).json(updateCount);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
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