const router = require('express').Router();
const { User, Playlist, Player } = require('../models');
const withAuth = require('../utils/withAuth')

router.get('/', async (req, res) => {
    try {
        const topPlaylist = await Playlist.findAll({
            order: [
                ['count', 'DESC']
            ],
            include: [{model: User}]
        })
        const topTwo = [topPlaylist[0], topPlaylist[1]];
        // must add the handlebards to render page but route works
        res.json({topTwo});
    } catch (error) {
        res.status(500).json(error);
    }
})
router.get('/login', async (req, res) => {
    res.render('login');
})
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk({
            where: {
                id: req.session.user_id
            },
            attributes: {
                exclude: ['password']
            },
            include: [{ model: Playlist}],
        })
        const userPlaylist = await Playlist.findOne({
            where: {
                userId: userData.playlist.userId
            },
            include: [{ model: Player}],
        });
        res.render('userHome', { userData , userPlaylist});
    } catch (error) {
        if (error) throw error;
        res.status(500).json(error);
    }
})
router.get('/all', withAuth, async (req, res) => {
    try {
        const allPlaylists = await Playlist.findAll({
            order: [
                ['id', 'DESC']
            ],
            include: [{ model: User}]
        })
        res.json(allPlaylists);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;