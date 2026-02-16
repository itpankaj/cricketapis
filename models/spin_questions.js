const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const SpinQuestions = sequelize.define('spin_questions', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    question: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    option_a: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    option_b: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    option_c: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    option_d: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    correct_option: {
        type: DataTypes.ENUM('a', 'b', 'c', 'd'),
        allowNull: false
    },
    difficulty: {
        type: DataTypes.ENUM('easy', 'medium', 'hard'),
        allowNull: false,
        defaultValue: 'easy'
    },
    is_active: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    }
}, {
    sequelize,
    tableName: 'spin_questions',
    timestamps: false
});

module.exports = SpinQuestions;
