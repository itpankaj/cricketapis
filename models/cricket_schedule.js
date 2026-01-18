const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const CricketSchedule = sequelize.define('cricket_schedule', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    match_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    series_id: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    match_no: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    team1: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    team2: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    venue: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    match_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('upcoming', 'live', 'completed'),
        allowNull: false,
        defaultValue: 'upcoming'
    },
    result: {
        type: DataTypes.TEXT,
        allowNull: true
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
    tableName: 'cricket_schedule',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }]
        },
        {
            name: "unique_match_id",
            unique: true,
            using: "BTREE",
            fields: [{ name: "match_id" }]
        },
        {
            name: "idx_series_id",
            using: "BTREE",
            fields: [{ name: "series_id" }]
        },
        {
            name: "idx_match_date",
            using: "BTREE",
            fields: [{ name: "match_date" }]
        }
    ]
});

module.exports = CricketSchedule;
