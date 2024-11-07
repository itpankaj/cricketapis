const { DataTypes } = require("sequelize"); // Import DataTypes
const conn = require("../connection/connection"); // Import the connection

const Subscribers = conn.define(
  "subscribers",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdAt: {
      field: 'createdAt',
      type: DataTypes.DATE,
  },
  updatedAt: {
      field: 'updatedAt',
      type: DataTypes.DATE,
  },
  },
  {
    tableName: "subscribers",
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
    ],
  }
);

module.exports = Subscribers;