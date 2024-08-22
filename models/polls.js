const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('polls', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lang_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option3: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option4: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option5: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option6: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option7: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option8: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option9: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option10: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    vote_permission: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "all"
    }
  }, {
    sequelize,
    tableName: 'polls',
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
    ]
  });
};
