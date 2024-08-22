const { DataTypes } = require('sequelize');
const conn = require('../connection/connection');

const SeoModel = require('./SeoModel');

const NavigationContentModel = conn.define('NavigationContentModel',{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    subTitle:{
        type:DataTypes.TEXT('long'),
        allowNull:true
    },
    description:{
        type:DataTypes.TEXT('long'),
        allowNull:true
    },
    authorId:{
        type:DataTypes.INTEGER,
        references:{
            model:'authors',
            key:'id'
        },
        allowNull:false
    },
    navigationId:{
        type:DataTypes.INTEGER,
        references:{
            model:'navigations',
            key:'id'
        },
        allowNull:true
    },
    NavigationCategoryId:{
        type:DataTypes.INTEGER,
        references:{
            model:'exam_category',
            key:'id'
        },
        allowNull:true
    },
    NavigationSubCategoryId:{
        type:DataTypes.INTEGER,
        references:{
            model:'exam_sub_category',
            key:'id'
        },
        allowNull:true
    },
    GroupDiscussionTopicId:{
        type:DataTypes.INTEGER,
        references:{
            model:'group_discussion_topics',
            key:'id'
        },
        allowNull:true
    },
    slug:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    authorDateTime:{
        type:DataTypes.DATE,
        allowNull:true
    }
 },{
    tableName: 'navigation_contents',
    paranoid: true,
 });

 

 NavigationContentModel.hasOne(SeoModel,{foreignKey:'navigationContentId'});


 module.exports = NavigationContentModel;