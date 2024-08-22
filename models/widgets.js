const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('widgets', {
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
    title: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    widget_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    visibility: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    is_custom: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    display_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'widgets',
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
