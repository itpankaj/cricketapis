const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');
const users = require('./users');

const LiveBlogEntries = sequelize.define('live_blog_entries', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    live_blog_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    entry_type: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'update',
        comment: 'update,key_event,result,wicket,boundary,milestone,break,summary,media'
    },
    title: {
        type: DataTypes.STRING(300),
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    embed_code: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    source_name: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    source_url: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    is_pinned: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    is_key_event: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    tableName: 'live_blog_entries',
    indexes: [
        { name: 'PRIMARY', unique: true, using: 'BTREE', fields: [{ name: 'id' }] },
        { name: 'idx_live_blog_id', using: 'BTREE', fields: [{ name: 'live_blog_id' }] },
        { name: 'idx_entry_type', using: 'BTREE', fields: [{ name: 'entry_type' }] },
        { name: 'idx_is_pinned', using: 'BTREE', fields: [{ name: 'is_pinned' }] },
        { name: 'idx_is_key_event', using: 'BTREE', fields: [{ name: 'is_key_event' }] },
        { name: 'idx_created_at', using: 'BTREE', fields: [{ name: 'created_at' }] }
    ]
});

// Associations
LiveBlogEntries.belongsTo(users, { foreignKey: 'user_id' });

module.exports = LiveBlogEntries;
