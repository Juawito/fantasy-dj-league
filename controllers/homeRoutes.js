const router = require('express').Router();
const {User, Playlist, Player} = require('../models');
const withAuth = require('../utils/withAuth')

router.get('/', async (req, res) => {
    res.render('homepage');
})
router.get('login', async (req, res) => {
    res.render('login');
})
// router.get('/user', async (req, res) => {
//     try {
//         const userData = await User.findAll({
//             where: {
//                 userName = req.body.userName,
//                 password = req.body.password
//             }
//         })
//         const topPlaylists = await Playlist.findAll();
// const userPlaylist = await Playlist
        

//         res.render('userHome', { userData , topTwo});
//     } catch (error) {
//         if (error) throw error;
//         res.status(500).json(error);
//     }
// })

module.exports = router;