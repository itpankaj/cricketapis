const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection/connection');

class CricketRankings extends Model {}

CricketRankings.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    ranking_id: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('batting', 'bowling', 'allrounder'),
        allowNull: false,
        defaultValue: 'batting'
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
    position: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    player_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    team: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    career_best_rating: {
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
    tableName: 'cricket_rankings',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }]
        },
        {
            name: "unique_ranking",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "category" },
                { name: "format" },
                { name: "gender" },
                { name: "position" }
            ]
        },
        {
            name: "idx_ranking_id",
            using: "BTREE",
            fields: [{ name: "ranking_id" }]
        },
        {
            name: "idx_category_format",
            using: "BTREE",
            fields: [
                { name: "category" },
                { name: "format" }
            ]
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
        }
    ]
});

module.exports = CricketRankings;
