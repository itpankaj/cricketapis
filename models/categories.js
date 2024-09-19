const { DataTypes } = require('sequelize');
const conn = require('../connection/connection');
const Posts = require('./posts');
const categories = conn.define('categories', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lang_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name_slug: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    keywords: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    block_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    category_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    show_at_homepage: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    show_on_menu: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    conn,
    tableName: 'categories',
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
    ]
  });

categories.hasMany(categories,{foreignKey:'parent_id',as:'SubCategories'});
categories.hasMany(Posts,{foreignKey:'category_id'});
Posts.belongsTo(categories,{foreignKey:'category_id'});

  module.exports = categories;

  
