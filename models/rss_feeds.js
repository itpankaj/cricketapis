const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rss_feeds', {
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
    feed_name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    feed_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    post_limit: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image_saving_method: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "url"
    },
    auto_update: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    read_more_button: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    read_more_button_text: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Read More"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    add_posts_as_draft: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    is_cron_updated: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    generate_keywords_from_title: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'rss_feeds',
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
