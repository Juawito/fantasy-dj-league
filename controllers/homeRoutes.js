const router = require('express').Router();
const { User, Playlist, Player } = require('../models');
const withAuth = require('../utils/withAuth')

router.get('/', async (req, res) => {
    try {
        res.render('landing');
        res.status(200); ``
    } catch (error) {
        if (error) throw error;
        res.status(500).json(error);
    }
})
router.get('/login', async (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
            })
            console.log('terminated old session ')
            res.render('login');
        } else {
            console.log('redirecting to login')
            res.render('login')
        }
    } catch (error) {
        if (error) throw error;
        console.log(error);
    }
})
router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
        res.status(200)
    } catch (error) {
        if (error) throw error;
        res.status(500);
    }
})
router.get('/profile', withAuth, async (req, res) => {
    try {
        //line 44 is not working properly needs to be re factored to modern sequalize for easier readability
        // need user data
        // need user playlist
        // need user players for playlist 

        // also need top two playlist with count and players

        const userData = await User.findOne({
            where: { id: req.session.user_id },
            attributes: {exclude: ['password']},
            include: [{model: Playlist}],
        });
        const userPlaylist = await Playlist.findAll({
            where: {userId: userData.id},
            attributes: ['playlist_name'],
            include: [{model: Player}],
        })
        const allPlaylists = await Playlist.findAll({
            include: [{model: Player}],
            order: [
                ['count', 'DESC'],
            ],
            limit: 2,
        })
        const topPlaylist = allPlaylists.map((playlist) => playlist.get({plain: true}));
        res.json({userData, ...userPlaylist, ...topPlaylist});
        // res.render('userinfo', {userData, ...userPlaylist, ...topPlaylist});

    } catch (error) {
        if (error) throw error;
        res.status(404).json(error);
    }

})
router.get('/all', withAuth, async (req, res) => {
    try {
        const playlists = await Playlist.findAll({
            // include: [
            //     {
            //         model: Player,
            //         attributes: ['track'],
            //         plain: true,
            //     },
            // ],
            // raw: false,
            // nest: true,
            order: [
                ['id', 'DESC'],
            ]
        });
        const allPlaylists = playlists.map((playlist) => playlist.get({ plain: true }));
        console.log(allPlaylists);
        res.render('allplayers', { allPlaylists });
    } catch (error) {
        if (error) throw error;
        res.status(500);
    }
})

module.exports = router;