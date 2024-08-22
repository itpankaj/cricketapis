const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('followers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'followers',
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
        name: "idx_following_id",
        using: "BTREE",
        fields: [
          { name: "following_id" },
        ]
      },
      {
        name: "idx_follower_id",
        using: "BTREE",
        fields: [
          { name: "follower_id" },
        ]
      },
    ]
  });
};
