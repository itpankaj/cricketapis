const { DataTypes } = require('sequelize');
const conn = require('../connection/connection');

const SeoModel = require('./SeoModel');

const NavigationModel = conn.define('NavigationModel',{
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    navType:{
        type:DataTypes.STRING,
        allowNull: false
    },
    nav:{
        type:DataTypes.STRING,
        allowNull: true
    },
    hasChild:{
        type:DataTypes.BOOLEAN,
        allowNull: false
    },
    visible:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0
    }
 },{
    tableName: 'navigations',
    paranoid: true,
 });

 
 NavigationModel.hasOne(SeoModel,{foreignKey:'navigationId'});


 module.exports = NavigationModel;