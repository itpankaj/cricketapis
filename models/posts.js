const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');
const PostFiles = require('./post_files');
const users = require('./users');
const PostPageViewMonth = require('./post_pageviews_month');
const PostImages = require('./post_images');
const Posttags = require('./post_tags');
 const Posts = sequelize.define('posts', {
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
    title_slug: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    title_hash: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    keywords: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    summary: {
      type: DataTypes.STRING(5000),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image_big: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_default: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_slider: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_mid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_small: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_mime: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "jpg"
    },
    image_storage: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "local"
    },
    optional_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    pageviews: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    need_auth: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    is_slider: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    slider_order: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    featured_order: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    is_recommended: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    is_breaking: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    is_scheduled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    is_footer:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    show_right_column: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    post_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "post"
    },
    video_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    video_storage: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "local"
    },
    image_url: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    video_url: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    video_embed_code: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    feed_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    post_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    show_post_url: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    image_description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    show_item_numbers: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    is_poll_public: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    twitter_link:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    short_description:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
  },
  updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
  },
  }, {
    sequelize,
    tableName: 'posts',
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
        name: "idx_category_id",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "idx_is_slider",
        using: "BTREE",
        fields: [
          { name: "is_slider" },
        ]
      },
      {
        name: "idx_is_featured",
        using: "BTREE",
        fields: [
          { name: "is_featured" },
        ]
      },
      {
        name: "idx_is_recommended",
        using: "BTREE",
        fields: [
          { name: "is_recommended" },
        ]
      },
      {
        name: "idx_is_breaking",
        using: "BTREE",
        fields: [
          { name: "is_breaking" },
        ]
      },
      {
        name: "idx_created_at",
        using: "BTREE",
        fields: [
          { name: "created_at" },
        ]
      },
      {
        name: "idx_lang_id",
        using: "BTREE",
        fields: [
          { name: "lang_id" },
        ]
      },
      {
        name: "idx_is_scheduled",
        using: "BTREE",
        fields: [
          { name: "is_scheduled" },
        ]
      },
      {
        name: "idx_visibility",
        using: "BTREE",
        fields: [
          { name: "visibility" },
        ]
      },
      {
        name: "idx_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "idx_status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
    ]
  });


Posts.hasMany(PostFiles,{foreignKey:'post_id'});
Posts.hasMany(PostPageViewMonth,{foreignKey:'post_id'});
Posts.hasMany(PostImages,{foreignKey:'post_id'});
Posts.hasMany(Posttags,{foreignKey:'postId'});
Posttags.belongsTo(Posts,{foreignKey:'postId'});
Posts.belongsTo(users,{foreignKey:'user_id'});


module.exports = Posts;
