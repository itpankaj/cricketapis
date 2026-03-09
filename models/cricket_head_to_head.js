const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const CricketHeadToHead = sequelize.define('cricket_head_to_head', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    team1: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    team2: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    format: {
        type: DataTypes.ENUM('test', 'odi', 't20i', 'all'),
        allowNull: false,
        defaultValue: 'all'
    },
    team1_wins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    team2_wins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    draws: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    no_results: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_matches: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    last_match_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    last_match_result: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_active: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    tableName: 'cricket_head_to_head',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }]
        },
        {
            name: "unique_h2h",
            unique: true,
            using: "BTREE",
            fields: [{ name: "team1" }, { name: "team2" }, { name: "format" }]
        },
        {
            name: "idx_team1",
            using: "BTREE",
            fields: [{ name: "team1" }]
        },
        {
            name: "idx_team2",
            using: "BTREE",
            fields: [{ name: "team2" }]
        },
        {
            name: "idx_format",
            using: "BTREE",
            fields: [{ name: "format" }]
        }
    ]
});

module.exports = CricketHeadToHead;
