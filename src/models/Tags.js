const { DataTypes } = require('sequelize');
const sequelize = require('../db/postresql')

const Tag = sequelize.define('tags', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Tag.sync();

module.exports = Tag;