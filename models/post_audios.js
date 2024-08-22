const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_audios', {
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
    audio_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'post_audios',
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
        name: "idx_audio_id",
        using: "BTREE",
        fields: [
          { name: "audio_id" },
        ]
      },
    ]
  });
};
