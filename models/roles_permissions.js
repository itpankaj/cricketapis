const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles_permissions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    admin_panel: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    add_post: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    manage_all_posts: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    navigation: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    pages: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    rss_feeds: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    categories: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    widgets: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    polls: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    gallery: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    comments_contact: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    newsletter: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ad_spaces: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    users: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    seo_tools: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    settings: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    reward_system: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'roles_permissions',
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
};
