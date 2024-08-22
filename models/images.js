const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('images', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    image_big: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_default: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_slider: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_mid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_small: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_mime: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "jpg"
    },
    file_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    storage: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "local"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'images',
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
        name: "idx_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
