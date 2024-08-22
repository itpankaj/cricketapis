const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ad_spaces', {
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
    ad_space: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ad_code_desktop: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    desktop_width: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    desktop_height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ad_code_mobile: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mobile_width: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mobile_height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    display_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    paragraph_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ad_spaces',
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
