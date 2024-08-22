const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('quiz_images', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    image_default: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_small: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    file_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    image_mime: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "jpg"
    },
    storage: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "local"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'quiz_images',
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
