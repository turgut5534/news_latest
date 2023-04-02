const { DataTypes } = require('sequelize');
const sequelize = require('../db/postresql')
const User = require('../models/User');
const NewsTag = require('./NewsTags');
const Tags = require('./Tags');

const News = sequelize.define('news', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255)
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dislikeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    lang: {
      type: DataTypes.STRING(50),
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
  });

  News.belongsTo(User, { foreignKey: 'authorId' });
  News.hasMany(NewsTag, { foreignKey: 'news_id' });
  NewsTag.belongsTo(Tags, { foreignKey: 'tag_id' });

  module.exports = News;