const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const SpinEntries = sequelize.define('spin_entries', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    prize_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    prize_label: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    questions_asked: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    answers_given: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    correct_count: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    total_questions: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 3
    },
    qualified: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    user_agent: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    tableName: 'spin_entries',
    timestamps: false
});

module.exports = SpinEntries;
