const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('language_translations', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lang_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    translation: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'language_translations',
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
        name: "idx_lang_id",
        using: "BTREE",
        fields: [
          { name: "lang_id" },
        ]
      },
    ]
  });
};
