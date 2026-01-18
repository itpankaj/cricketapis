const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const CricketSeries = sequelize.define('cricket_series', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    series_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    format: {
        type: DataTypes.ENUM('test', 'odi', 't20', 'mixed'),
        allowNull: false,
        defaultValue: 'mixed'
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'bilateral'
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
    tableName: 'cricket_series',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }]
        },
        {
            name: "unique_series_id",
            unique: true,
            using: "BTREE",
            fields: [{ name: "series_id" }]
        },
        {
            name: "idx_year",
            using: "BTREE",
            fields: [{ name: "year" }]
        }
    ]
});

module.exports = CricketSeries;
