const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');
const Posts = require('./posts');
const categories = require('./categories');
 const PostCategories = sequelize.define('post_categories', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model:'posts',
        key:'id'
    },
    },
    catId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model:'categories',
        key:'id'
    },
    }
  }, {
    sequelize,
    tableName: 'post_categories',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_post_id",
        using: "BTREE",
        fields: [
          { name: "postId" },
        ]
      },
      {
        name: "idx_file_id",
        using: "BTREE",
        fields: [
          { name: "catId" },
        ]
      },
    ]
  });

  // 
  
  
  module.exports = PostCategories;
