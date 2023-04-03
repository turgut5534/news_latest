const { DataTypes } = require('sequelize');
const sequelize = require('../db/postresql')

const Tag = sequelize.define('tags', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

// Tag.sync();

module.exports = Tag;