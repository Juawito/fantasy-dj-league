const router = require('express').Router();
const { User, Playlist, Player } = require('../models');
const withAuth = require('../utils/withAuth')
const sequelize = require('../config/connection');
const mysql = require('mysql');
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
            // console.log('redirecting to profile');
            // res.redirect('/profile')
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
            let [user, top1Metadata] = await sequelize.query(`SELECT id, artist, track, playlist_id FROM fantasy_dj_db.player WHERE playlist_id = "${req.session.user_id}";`);
            let [userList, top1RMetadata] = await sequelize.query("SELECT artist, track, playlist_id FROM fantasy_dj_db.player WHERE playlist_id = 2;");
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
            let [top1Res, top1ResMetadata] = await sequelize.query(`SELECT id, artist, track, playlist_id FROM fantasy_dj_db.player WHERE playlistId = "${top1Playlist}";`);
            console.log(top1Res)
            // console.log(top1PlaylistName)



            let [top2Res, top2ResMetadata] = await sequelize.query(`SELECT artist, track, playlist_id FROM fantasy_dj_db.player WHERE playlistId = "${top2Playlist}";`);
            console.log(top2Res)
            // console.log(top2PlaylistName)

            // console.log(userList)
            // // connection.end
            res.render('userinfo', { userList, top1Res, top2Res, top1PlaylistName, top2PlaylistName });

    } catch (error) {
        if (error) throw error;
        res.status(404).json(error);
    }

})
router.get('/all', withAuth, async (req, res) => {
    try {
        // await selectAllPlaylist()
        // async function selectAllPlaylist() {
        //     let [allPlaylists, metadata2] = await sequelize.query(`SELECT id, playlist_name, count  FROM fantasy_dj_db.playlist ORDER BY count DESC`);
        //     res.render('allplayers', { allPlaylists });
        // }
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