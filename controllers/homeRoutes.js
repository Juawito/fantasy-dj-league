const router = require('express').Router();
const { User, Playlist, Player } = require('../models');
const withAuth = require('../utils/withAuth')
const sequelize = require('../config/connection');
const mysql = require('mysql');
router.get('/', async (req, res) => {
    res.render('landing');
})
router.get('/login', async (req, res) => {
    try {
        // req.session.destroy(() => {
        //     res.status(204).end();
        // })
        if (req.session.logged_in) {
            console.log(req.session.logged_in)
            res.redirect('/profile')
        }
        res.render('login');
    } catch (error) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    }
})
router.get('/signup', async (req, res) => {
    res.render('signup');
})
router.get('/profile', withAuth, async (req, res) => {
   
    selectPlaylist()
    async function selectPlaylist() {
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
        let [top1Res, top1ResMetadata] = await sequelize.query(`SELECT id, artist, track, playlist_id FROM fantasy_dj_db.player WHERE playlist_id = "${top1Playlist}";`);
        console.log(top1Res)
        // console.log(top1PlaylistName)



        let [top2Res, top2ResMetadata] = await sequelize.query(`SELECT artist, track, playlist_id FROM fantasy_dj_db.player WHERE playlist_id = "${top2Playlist}";`);
        console.log(top2Res)
        // console.log(top2PlaylistName)

        // console.log(userList)
        // // connection.end
        res.render('userinfo',{ userList,top1Res, top2Res, top1PlaylistName, top2PlaylistName, logged_in: true });
    }
    })
router.get('/all', async (req, res) => {
    selectAllPlaylist()
    async function selectAllPlaylist() {
        let [allPlaylists, metadata2] = await sequelize.query(`SELECT id, playlist_name, count  FROM fantasy_dj_db.playlist ORDER BY count DESC`);
        res.render('allplayers', { allPlaylists });
    }
})

module.exports = router;