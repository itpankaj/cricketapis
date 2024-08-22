const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_pageviews_month', {
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
    post_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_agent: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reward_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'post_pageviews_month',
    timestamps: true,
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
        name: "idx_created_at",
        using: "BTREE",
        fields: [
          { name: "created_at" },
        ]
      },
      {
        name: "idx_post_user_id",
        using: "BTREE",
        fields: [
          { name: "post_user_id" },
        ]
      },
    ]
  });
};
