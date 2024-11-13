const { DataTypes } = require('sequelize');
const conn = require('../connection/connection');
const subMenuModel = conn.define('subMenuModel', {
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
    menuId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
          model:'menu',
          key:'id'
      },
      }
  }, {
    conn,
    tableName: 'sub_menu',
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


  module.exports = subMenuModel;
