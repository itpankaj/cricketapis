const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('themes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    theme: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    theme_folder: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    theme_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    theme_color: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    block_color: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mega_menu_color: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'themes',
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
};
