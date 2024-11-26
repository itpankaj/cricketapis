const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const Posts = require('../models/posts');
const PostFiles = require('../models/post_files');
const categories = require('../models/categories');
var { Op, where } = require('sequelize');
const users = require('../models/users');
const PostImages = require('../models/post_images');
const sequelize = require('../connection/connection');
const PostPageViewMonth = require('../models/post_pageviews_month');
const Posttags = require('../models/post_tags');
const Tags = require('../models/tags');
const PostCategories = require('../models/post_category');


router.get('/post/:slug', async (req,res) => {

    try {

        const slug = req.params.slug;

        const page = parseInt(req.query.page) || 1;

        const limit = 10; // Number of items to fetch per page
        
        const offset = (page - 1) * limit;
    

        const tags = await Tags.findOne({where:{
            tag_slug:slug
        }});

        if(!tags) {
            return res.status(404).json({
                message:"tag not found",
                code :"HTTP_NOT_FOUND"
            });
        }


        const data = await Posttags.findAll({

            attributes:['id'],

            where:{
                tagId:tags.id
            },
            limit:limit,
            offset:offset,
            include:[
                {
                    model:Posts,
                    include:[

                        {
                            model:Posttags,
                            attributes:['id'],
                            include:[
                                {
                                    model:Tags
                                }
                            ]
                        },
               
                        {
                            model:PostImages
                        },
                        {
                            model:users,
                            attributes:['id','username','email','first_name','last_name']
                        },
                        {
                            model:PostCategories,
                            include:[
                                {
                                    model:categories,
                                    attributes:['id','name','name_slug'],
                                    include:[
                                        {
                                            model:categories,
                                            as:'SubCategories',
                                            attributes:['id','name','name_slug']
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            model:PostFiles
                        }
                    ]
                   
                }
            ]

        });


        return res.status(200).json(data);
        
    } catch (error) {

        return res.json({'message':error.message})
    }
    
  

});


module.exports = router;