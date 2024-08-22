const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('quiz_results', {
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
    result_title: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    image_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_storage: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "local"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    min_correct_count: {
      type: DataTypes.MEDIUMINT,
      allowNull: true
    },
    max_correct_count: {
      type: DataTypes.MEDIUMINT,
      allowNull: true
    },
    result_order: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'quiz_results',
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
