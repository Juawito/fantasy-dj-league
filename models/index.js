const User = require('./User');
const Playlist = require('./Playlist');
const Player = require('./Player');

User.hasOne(Playlist, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Playlist.belongsTo(User, {
    foreignKey: 'userId'
});

Playlist.hasMany(Player, {
    foreignKey: 'playlistId',
});
Player.belongsTo(Playlist, {
    foreignKey: 'playlistId'
});

module.exports = { User, Playlist, Player};