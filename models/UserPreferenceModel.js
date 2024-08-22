const { DataTypes } = require('sequelize');
const conn = require('../connection/connection');

 const UserPreferenceModel = conn.define('UserPreferenceModel',{
    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:'users',
            key:'id'
        }
    },
    workExp:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:true
    },
    highestCourseId:{
        type:DataTypes.INTEGER,
        references:{
            model:'courses',
            key:'id'
        },
        allowNull:true
    },

    coursePlanningId:{
        type:DataTypes.INTEGER,
        references:{
            model:'courses',
            key:'id'
        },
        allowNull:true
    },
    cityPreference :{
        type:DataTypes.STRING,
        allowNull: false
    },
    cityId:{
        type:DataTypes.INTEGER,
        allowNull:false 
    },
    studyModeId:{
        type:DataTypes.INTEGER,
        references:{
            model:'study_modes',
            key:'id'
        },
        allowNull:true
    },
    admissionYear:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:true
    }

 },{
    tableName: 'user_preferences'
 });


//  UserPreferenceModel.sync({ alter: true })

 module.exports = UserPreferenceModel;
  