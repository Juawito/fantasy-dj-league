const router = require('express').Router();
const { User, Playlist, Player } = require('../models');
const withAuth = require('../utils/withAuth')
const sequelize = require('../config/connection');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'blackmag3',
    database: 'fantasy_dj_db',
  });
router.get('/', async (req, res) => {
    selectPlaylist()
    async function selectPlaylist() {     
        let [results2, metadata2] = await sequelize.query(`SELECT playlist_name, count, id FROM fantasy_dj_db.playlist ORDER BY count DESC LIMIT 2`);
        // console.log(results2)
        connection.end
      
        // these are the names of the playlists
        let top1PlaylistName = results2[0].playlist_name;
        let top2PlaylistName = results2[1].playlist_name;
      
        //these are the ids of the playlists, plug these into the next sql searches to bring up the players
        let top1Playlist = results2[0].id;
        let top2Playlist = results2[1].id;
        // console.log(top1Playlist, top2Playlist)
        // these sql searches pull up each player in playlists
        let [top1Res, top1ResMetadata] = await sequelize.query(`SELECT id, artist, track, playlist_id FROM fantasy_dj_db.player WHERE playlist_id = "${top1Playlist}";`);
        console.log(top1Res)
        // console.log(top1PlaylistName)
        connection.end
       

      
        let [top2Res, top2ResMetadata] = await sequelize.query(`SELECT artist, track, playlist_id FROM fantasy_dj_db.player WHERE playlist_id = "${top2Playlist}";`);
        console.log(top2Res)
        // console.log(top2PlaylistName)
       

        connection.end
        res.render('all', { top1Res, top2Res });

        
        
      
      
      };
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