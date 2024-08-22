const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ci_sessions', {
    id: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    data: {
      type: DataTypes.BLOB,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ci_sessions',
    timestamps: false,
    indexes: [
      {
        name: "ci_sessions_timestamp",
        using: "BTREE",
        fields: [
          { name: "timestamp" },
        ]
      },
    ]
  });
};
