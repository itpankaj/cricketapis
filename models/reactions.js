const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reactions', {
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
    re_like: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    re_dislike: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    re_love: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    re_funny: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    re_angry: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    re_sad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    re_wow: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'reactions',
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
    ]
  });
};
