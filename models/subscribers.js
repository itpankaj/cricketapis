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
    }
  },
  {
    tableName: "subscribers",
    timestamps: false,
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