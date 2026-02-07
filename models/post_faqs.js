const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const PostFaqs = sequelize.define('post_faqs', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    post_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    question: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'post_faqs',
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
        {
            name: "idx_post_id",
            using: "BTREE",
            fields: [
                { name: "post_id" },
            ]
        },
        {
            name: "idx_sort_order",
            using: "BTREE",
            fields: [
                { name: "sort_order" },
            ]
        },
    ]
});

module.exports = PostFaqs;
