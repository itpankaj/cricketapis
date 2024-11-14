const { DataTypes } = require('sequelize');
const conn = require('../connection/connection');
module.exports = conn.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "name@domain.com"
    },
    email_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    token: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "user"
    },
    user_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "registered"
    },
    google_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    facebook_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    vk_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cover_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    about_me: {
      type: DataTypes.STRING(5000),
      allowNull: true
    },
    facebook_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    twitter_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    instagram_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    pinterest_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    linkedin_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    vk_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    telegram_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    youtube_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    tiktok_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    personal_website_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    last_seen: {
      type: DataTypes.DATE,
      allowNull: true
    },
    show_email_on_profile: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    show_rss_feeds: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    reward_system_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    total_pageviews: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    conn,
    tableName: 'users',
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

