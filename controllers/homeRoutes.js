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
router.get('/profile', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                userName: req.body.username,
            },
            include: [{ model: Playlist}],
        })
        const userPlaylist = await Playlist.findAll({
            where: {
                userId: userData.playlist.userId
            },
            include: [{ model: Player}],
        });
        if (userData.checkPassword(req.body.password)) {
            res.json({userData, userPlaylist});
        }
        else {
            res.json({ message: 'your username or password is incorrect' })
        }
        // res.render('userHome', { userData , topTwo});
    } catch (error) {
        if (error) throw error;
        res.status(500).json(error);
    }
})
router.get('/add', async (req, res) => {
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