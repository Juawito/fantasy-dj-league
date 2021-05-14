const router = require('express').Router();

const playerRoutes = require('./players-routes');
const playlistRoutes = require('./playlist-routes');
const userRoutes = require('./user-routes');

router.use('/player', playerRoutes);
router.use('/playlist', playlistRoutes);
router.use('/user', userRoutes);

module.exports = router;