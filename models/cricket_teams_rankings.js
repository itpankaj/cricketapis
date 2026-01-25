const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection/connection');

class CricketTeamsRankings extends Model {}

CricketTeamsRankings.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    ranking_id: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    format: {
        type: DataTypes.ENUM('test', 'odi', 't20'),
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('men', 'women'),
        allowNull: false,
        defaultValue: 'men'
    },
    ranking_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'icc'
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    team_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    matches: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    updated_date: {
        type: DataTypes.DATEONLY,
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
    tableName: 'cricket_teams_rankings',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }]
        },
        {
            name: "unique_team_ranking",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "format" },
                { name: "gender" },
                { name: "ranking_type" },
                { name: "position" }
            ]
        },
        {
            name: "idx_ranking_id",
            using: "BTREE",
            fields: [{ name: "ranking_id" }]
        },
        {
            name: "idx_format",
            using: "BTREE",
            fields: [{ name: "format" }]
        },
        {
            name: "idx_gender",
            using: "BTREE",
            fields: [{ name: "gender" }]
        },
        {
            name: "idx_ranking_type",
            using: "BTREE",
            fields: [{ name: "ranking_type" }]
        }
    ]
});

module.exports = CricketTeamsRankings;
