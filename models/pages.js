
const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');
module.exports =  sequelize.define('pages', {
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
    slug: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    keywords: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    is_custom: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    page_default_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    page_content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    page_order: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 1
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    title_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    breadcrumb_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    right_column_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    need_auth: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "top"
    },
    link: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    page_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "page"
    }
  }, {
    sequelize,
    tableName: 'pages',
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
    ]
  });
