const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');
const PostImages = sequelize.define('post_images', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image_big: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_default: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    storage: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "local"
    }
  }, {
    sequelize,
    tableName: 'post_images',
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
          { name: "post_id" },
        ]
      },
    ]
  });

  module.exports = PostImages;

