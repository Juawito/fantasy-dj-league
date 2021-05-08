const sequelize = require('../config/connection');
const Artist = require('../models/Artist');
const artistData = require('./artist-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Artist.bulkCreate(artistData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
