const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');
const Tags = require('./tags');
const Posttags = sequelize.define('post_tags', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tagId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
  }, {
    sequelize,
    tableName: 'post_tags',
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
    ]
  });

  module.exports = Posttags;

  Posttags.belongsTo(Tags,{foreignKey:'tagId'});


