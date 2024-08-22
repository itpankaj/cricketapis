const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('routes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    admin: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "admin"
    },
    profile: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "profile"
    },
    tag: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "tag"
    },
    reading_list: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "reading-list"
    },
    settings: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "settings"
    },
    social_accounts: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "social-accounts"
    },
    preferences: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "preferences"
    },
    change_password: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "change-password"
    },
    forgot_password: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "forgot-password"
    },
    reset_password: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "reset-password"
    },
    delete_account: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "delete-account"
    },
    register: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "register"
    },
    posts: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "posts"
    },
    search: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "search"
    },
    rss_feeds: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "rss-feeds"
    },
    gallery_album: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "gallery-album"
    },
    earnings: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "earnings"
    },
    payouts: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "payouts"
    },
    set_payout_account: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "set-payout-account"
    },
    logout: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "logout"
    }
  }, {
    sequelize,
    tableName: 'routes',
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
