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
    // Use STRING to return datetime exactly as stored in DB (IST) without timezone conversion
    match_date: {
        type: DataTypes.STRING(50),
        allowNull: true,
        // Custom getter to format the raw datetime from MySQL
        get() {
            const rawValue = this.getDataValue('match_date');
            return rawValue; // Return as-is from database
        }
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
    // These are metadata fields - keep as strings to avoid timezone issues
    created_at: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    updated_at: {
        type: DataTypes.STRING(50),
        allowNull: true
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
