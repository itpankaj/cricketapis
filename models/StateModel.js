const { DataTypes } = require('sequelize');
const conn = require('../connection/connection');
const CoursesModel = require('./CoursesModel');

 const StateModel = conn.define('StateModel',{

    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    country_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type:DataTypes.TINYINT,
        allowNull: true
    }
 },{
    tableName: 'states',
 },{
     // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false,
 });


 module.exports = StateModel;
  