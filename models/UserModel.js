const { DataTypes } = require('sequelize');
const conn = require('../connection/connection');
const UserPreferenceModel = require('./UserPreferenceModel');

 const UserModel = conn.define('UserModel',
 {
    firstName:{
        type:DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull: true
    },
    email :{
        type:DataTypes.STRING,
        allowNull: false
    },
    emailVerifiedAt:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    mobile:{
        type: DataTypes.STRING,
        allowNull: false
    },
    mobileVerifiedAt:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    password:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    resetToken:{
        type:DataTypes.TEXT,
        allowNull:true,
    },
    stateId:{
        type:DataTypes.INTEGER,
        allowNull:true   
    },
    cityId:{
        type:DataTypes.INTEGER,
        allowNull:true 
    },
    address:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    batchYear:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    gender:{
        type:DataTypes.STRING,
        allowNull:true
    },
    terms:{
        type:DataTypes.STRING,
        allowNull:true
    },
    status:{
        type: DataTypes.ENUM,
        values: ['active', 'blocked'],
        defaultValue:'active'
    },
    lastLogin:{
        type:DataTypes.DATE,
        allowNull:true
    },
    isLead:{
        type:DataTypes.TINYINT,
        defaultValue:0
    },
    socialId:{
        type:DataTypes.STRING,
        allowNull:true
    }
    

 },{
    tableName: 'users',
    paranoid: true,
 });

//  UserModel.sync({ alter: true })

UserModel.hasOne(UserPreferenceModel,{foreignKey:'userId'});


 module.exports = UserModel;
  