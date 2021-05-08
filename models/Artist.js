const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Artist extends Model {}

Artist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    track: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    album: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    null: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'artist',
  }
);

module.exports = Artist;
