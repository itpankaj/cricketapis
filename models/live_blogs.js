const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');
const users = require('./users');
const categories = require('./categories');

const LiveBlogs = sequelize.define('live_blogs', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    title_slug: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    keywords: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    image_default: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    image_big: {
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
    image_storage: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: 'local'
    },
    image_mime: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: 'jpg'
    },
    image_url: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    image_cloud: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    match_info: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: '0=draft, 1=live, 2=ended, 3=archived'
    },
    is_pinned: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    is_featured: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    linked_post_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    lang_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    entry_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    started_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ended_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE
    }
}, {
    sequelize,
    tableName: 'live_blogs',
    indexes: [
        { name: 'PRIMARY', unique: true, using: 'BTREE', fields: [{ name: 'id' }] },
        { name: 'idx_title_slug', unique: true, using: 'BTREE', fields: [{ name: 'title_slug' }] },
        { name: 'idx_status', using: 'BTREE', fields: [{ name: 'status' }] },
        { name: 'idx_category_id', using: 'BTREE', fields: [{ name: 'category_id' }] },
        { name: 'idx_is_pinned', using: 'BTREE', fields: [{ name: 'is_pinned' }] },
        { name: 'idx_is_featured', using: 'BTREE', fields: [{ name: 'is_featured' }] },
        { name: 'idx_created_at', using: 'BTREE', fields: [{ name: 'created_at' }] }
    ]
});

// Associations
LiveBlogs.belongsTo(users, { foreignKey: 'user_id' });
LiveBlogs.belongsTo(categories, { foreignKey: 'category_id' });

module.exports = LiveBlogs;
