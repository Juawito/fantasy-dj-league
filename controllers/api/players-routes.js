const router = require('express').Router();
const {Player} = require('../../models');

router.post('/add', async (req, res) => {
  try {
    const newPlayer = await Player.create(req.body);

    res.status(200).json(newPlayer);
  } catch (error) {
    res.status(400).json(error);
  }
})
router.delete('/:id', async (req, res) => {
  try {
    const deletePlayer = await Player.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json(deletePlayer);
  } catch (error) {
    res.status(400).json(error);
  }
})

module.exports = router;
