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

router.get('/all', async (req,res) => {

    try{

        const search = req.query.search;

        var whereCondition = {};
    
        const offset = (req.query.page == 1) ? 0 : (req.query.page-1) * 5;
    
        const limit = 10;
    
        if(search) {
            
            const searchKewords = search.split(' ');
    
            const searchArr = [];
    
            for(itemSerch of searchKewords) {
    
                const item = {
                    title: {
                        [Op.like]: '%'+itemSerch+'%'
                    }
                }
    
                searchArr.push(item)
    
            } 
    
            whereCondition = {
                [Op.and]: searchArr
            }
    
        }
    
        const data = await Posts.findAll({
    
            where:whereCondition,
    
            limit:limit,
    
            offset:offset
            
          }
        );
    
        const totalPosts = await Posts.count();
    
        return res.status(200).json({data:data,total:totalPosts});


    }catch(err) {
        return res.json({'error':err.message});
    }

   

});


router.get('/homepage/slider-image', async (req,res) => {

    const data = await Posts.findAll({
        where:{
            is_slider:1
        },
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
                attributes:['id','username','email']
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
        ],
        order:[
            [
                'slider_order',
                'ASC'
            ]
        ],
        limit:10});

    return res.status(200).json(data);

});



router.get('/homepage/recommended/:slug', async (req,res) => {

    const slug = req.params.slug;

    let data = [];

    const categoryId = await categories.findOne({where:{
        name_slug:slug
    }})

    if(categoryId) {


        console.log('----->')

         data = await Posts.findAll({
            where:{
                is_recommended:1,
                category_id:categoryId.id
            },
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
                    attributes:['id','username','email']
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
            ],
            order:[
                [
                    'id',
                    'DESC'
                ]
            ],
            limit:10});
    }

   

    return res.status(200).json(data);

});


router.get('/homepage/featured', async (req,res) => {

    const data = await Posts.findAll({
        where:{
            is_featured:1
        },
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
                attributes:['id','username','email']
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
        ],
        order:[
            [
                'featured_order',
                'ASC'
            ]
        ],
        limit:10});

    return res.status(200).json(data);

});



router.get('/:slug', async (req,res) => {


    try {

        const slug = req.params.slug;

        const data = await Posts.findOne({
            where:{
                title_slug:slug
            },
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
                    attributes:['id','username','email']
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
        });

        if(!data) {
            return res.status(404).json({message:"post not found"});
        }

        // add post view record

        await PostPageViewMonth.create({
            post_id:data.id,

        });

        const count = await PostPageViewMonth.count({
           where:{
            post_id:data.id
           }
        });
    
        return res.status(200).json({data:data,count:count});
        
    } catch (error) {

        return res.json({'message':error.message})
    }
    
  

});


module.exports = router;