const router = require('express').Router();
const { User, Playlist, Player } = require('../models');
const withAuth = require('../utils/withAuth')
const sequelize = require('../config/connection');
const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'blackmag3',
//     database: 'fantasy_dj_db',
//   });

router.get('/', async (req, res) => {
    selectPlaylist()
    async function selectPlaylist() {     
        let [results2, metadata2] = await sequelize.query(`SELECT playlist_name, count, id FROM fantasy_dj_db.playlist ORDER BY count DESC LIMIT 2`);
        // console.log(results2)
       

        // these are the names of the playlists
        let top1PlaylistName = results2[0];
        let top2PlaylistName = results2[1].playlistName;

        //these are the ids of the playlists, plug these into the next sql searches to bring up the players
        let top1Playlist = results2[0].id;
        let top2Playlist = results2[1].id;
        // console.log(top1Playlist, top2Playlist)
        // these sql searches pull up each player in playlists
        let [top1Res, top1ResMetadata] = await sequelize.query(`SELECT id, artist, track, playlist_id FROM fantasy_dj_db.player WHERE playlist_id = "${top1Playlist}";`);
        console.log(top1Res)
        // console.log(top1PlaylistName)



        let [top2Res, top2ResMetadata] = await sequelize.query(`SELECT artist, track, playlist_id FROM fantasy_dj_db.player WHERE playlist_id = "${top2Playlist}";`);
        console.log(top2Res)
        // console.log(top2PlaylistName)


        res.render('all', { top1Res, top2Res, top1PlaylistName, top2PlaylistName });
      };   
    // try {
    //     const topPlaylist = await Playlist.findAll({
    //         order: [
    //             ['count', 'DESC']
    //         ],
    //         include: [{ model: User }]
    //     })
    //     const topOne = topPlaylist[0]
    //     const topTwo = topPlaylist[1]
    //     // must add the handlebards to render page but route works
        
    //     res.render('all', { topOne, topTwo });
    // } catch (error) {
    //     res.status(500).json(error);
    // }
})
router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        console.log(req.session.logged_in)
        res.redirect('/profile')
    };
    res.render('login');
    return
})
router.get('/signup', async (req, res) => {
    res.render('signup');
})
router.get('/profile', withAuth, async (req, res) => {
    console.log("profile get!!!!!")


    // let [userList, top1ResMetadata] = await sequelize.query(`SELECT id, artist, track, playlist_id FROM fantasy_dj_db.player WHERE playlist_id = "${playlist_id}";`);
    let [userList, top1ResMetadata] = await sequelize.query("SELECT artist, track, playlist_id FROM fantasy_dj_db.player WHERE playlist_id = 2;");
    console.log(userList)
    // connection.end
    res.render('userinfo', { userList });

    // try {
    //     const userData = await User.findByPk(req.session.user_id,
    //         {
    //             attributes: {
    //                 exclude: ['password']
    //             },
    //             include: [{ model: Playlist }],
    //         })
    //     const userPlaylist = await Playlist.findOne({
    //         where: {
    //             userId: userData.playlist.userId
    //         },
    //         include: [{ model: Player }],
    //     });
    //     // res.json({userData,userPlaylist});
    //     res.render('userinfo', { userData , userPlaylist});
    // } catch (error) {
    //     if (error) throw error;
    //     res.status(500).json(error);
    // }
})
router.get('/all', async (req, res) => {
    selectAllPlaylist()
    async function selectAllPlaylist() {     
        let [allPlaylists, metadata2] = await sequelize.query(`SELECT id, playlist_name, count  FROM fantasy_dj_db.playlist ORDER BY count DESC`);
        console.log(allPlaylists)
   
   
   
   
   
    // try {
    //     const allPlaylists = await Playlist.findAll({
    //         order: [
    //             ['id', 'DESC']
    //         ],
    //         include: [{ model: User }]
    //     })
        
        // res.json(allPlaylists)
        
     res.render('allplayers', {allPlaylists});
    }
})

module.exports = router;