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

NewsTag.belongsTo(Tags, { foreignKey: 'tag_id' });
Tags.hasMany(NewsTag, {foreignKey: 'tag_id' })

module.exports = NewsTag;