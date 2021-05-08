const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Player extends Model { }

Player.init(
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
      allowNull: true,
    },
    null: {
      type: DataTypes.BOOLEAN,
    },
    playlistId: {
      type: DataTypes.INTEGER,
      refrences: {
        model: 'playlist',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'player',
  }
);

module.exports = Player;
