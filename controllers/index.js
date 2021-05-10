const router = require('express').Router();

// const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const playerRoutes = require('./players-routes');

router.use('/', homeRoutes);
router.use('/players', playerRoutes);

// router.use('/api', apiRoutes);

module.exports = router;