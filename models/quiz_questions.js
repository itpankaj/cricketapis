const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('quiz_questions', {
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
    question: {
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
    question_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    answer_format: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "small_image"
    }
  }, {
    sequelize,
    tableName: 'quiz_questions',
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
