const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('languages', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    short_form: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    language_code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    text_direction: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    text_editor_lang: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "en"
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    language_order: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'languages',
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
