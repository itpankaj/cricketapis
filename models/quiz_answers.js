const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('quiz_answers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question_id: {
      type: DataTypes.INTEGER,
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
    answer_text: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    assigned_result_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    total_votes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'quiz_answers',
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
        name: "idx_question_id",
        using: "BTREE",
        fields: [
          { name: "question_id" },
        ]
      },
    ]
  });
};
