const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const CricketPointsTable = sequelize.define('cricket_points_table', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    series_id: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    group_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null
    },
    team: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    played: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    won: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    lost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    tied: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    no_result: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    net_run_rate: {
        type: DataTypes.DECIMAL(6, 3),
        allowNull: false,
        defaultValue: 0.000
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    tableName: 'cricket_points_table',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }]
        },
        {
            name: "unique_series_group_team",
            unique: true,
            using: "BTREE",
            fields: [{ name: "series_id" }, { name: "group_name" }, { name: "team" }]
        },
        {
            name: "idx_series_id",
            using: "BTREE",
            fields: [{ name: "series_id" }]
        },
        {
            name: "idx_group_name",
            using: "BTREE",
            fields: [{ name: "group_name" }]
        }
    ]
});

module.exports = CricketPointsTable;
