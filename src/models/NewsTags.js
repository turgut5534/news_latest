const { DataTypes } = require('sequelize');
const sequelize = require('../db/postresql');
const Tags = require('../models/Tags')

const NewsTag = sequelize.define('news_tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  news_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'news',
      key: 'id',
    },
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tags',
      key: 'id',
    },
  },
});

// NewsTag.hasMany(Tags, { foreignKey: 'tag_id' });

module.exports = NewsTag;