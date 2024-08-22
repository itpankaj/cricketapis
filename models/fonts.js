const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fonts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    font_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    font_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    font_url: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    font_family: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    font_source: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "google"
    },
    has_local_file: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'fonts',
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
