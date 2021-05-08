const sequelize = require('../config/connection');
// Names of models may change
// Using User as a placeholder
const { User} = require('../models');

const userData = require('./seedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    await User.bulkCreate(userData, {
        // waiting to create hooks to be called in here
    });

    process.exit(0);
};

seedDatabase();