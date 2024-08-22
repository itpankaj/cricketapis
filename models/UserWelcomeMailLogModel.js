const { DataTypes } = require('sequelize');
const conn = require('../connection/connection');

 const UserWelcomeMailLogModel = conn.define('UserWelcomeMailLogModel',{
    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:'users',
            key:'id'
        },
        allowNull:false
    },
    subject:{
        type:DataTypes.STRING,
        allowNull:true
    },
    status:{
        type:DataTypes.TEXT,
        allowNull:true
    }

 },{
    tableName: 'user_welcome_mail_logs'
 });


//  UserPreferenceModel.sync({ alter: true })

 module.exports = UserWelcomeMailLogModel;
  