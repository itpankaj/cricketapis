const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('audios', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    audio_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    audio_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    download_button: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
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
    tableName: 'audios',
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
