const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gallery', {
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
    title: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    path_big: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    path_small: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_album_cover: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    storage: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "local"
    }
  }, {
    sequelize,
    tableName: 'gallery',
    timestamps: true,
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
};
