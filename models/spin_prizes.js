const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const SpinPrizes = sequelize.define('spin_prizes', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    color: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: '#3B82F6'
    },
    text_color: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: '#FFFFFF'
    },
    probability: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 10.00
    },
    prize_type: {
        type: DataTypes.ENUM('discount', 'freebie', 'points', 'badge', 'nothing'),
        allowNull: false,
        defaultValue: 'badge'
    },
    prize_value: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    max_winners: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    current_winners: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    is_active: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'spin_prizes',
    timestamps: false
});

module.exports = SpinPrizes;
