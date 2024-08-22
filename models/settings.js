const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('settings', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lang_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    site_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    home_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Index"
    },
    site_description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    keywords: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    application_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    primary_font: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 19
    },
    secondary_font: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 25
    },
    tertiary_font: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 32
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
    optional_url_button_name: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: "Click Here To See More"
    },
    about_footer: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    contact_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contact_address: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    contact_email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    contact_phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    copyright: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    cookies_warning: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    cookies_warning_text: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'settings',
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
