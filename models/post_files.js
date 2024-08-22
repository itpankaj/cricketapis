const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');
 const PostFiles = sequelize.define('post_files', {
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
    file_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'post_files',
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
      {
        name: "idx_file_id",
        using: "BTREE",
        fields: [
          { name: "file_id" },
        ]
      },
    ]
  });

  module.exports = PostFiles;
