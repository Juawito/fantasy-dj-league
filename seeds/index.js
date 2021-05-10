const sequelize = require('../config/connection');
const { Playlist, User, Player } = require('../models');

const playerData = require('./player-seeds.json');
const userData = require('./user-seeds.json')
const playlistData = require('./playlist-seeds.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });
  await Playlist.bulkCreate(playlistData,
    {
    individualHooks: true,
    returning: true
  });
  await Player.bulkCreate(playerData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
