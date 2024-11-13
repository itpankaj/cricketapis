const { DataTypes } = require('sequelize');
const conn = require('../connection/connection');
const subMenuModel = require('./subMenuModel');
const menuModel = conn.define('menuModel', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    navType: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nav: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hasChild: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    conn,
    tableName: 'menu',
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

  menuModel.hasMany(subMenuModel,{foreignKey:'menuId'});

  module.exports = menuModel;
