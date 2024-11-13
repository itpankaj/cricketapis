const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const categories = require('../models/categories');
const Posts = require('../models/posts');
const PostImages = require('../models/post_images');
const users = require('../models/users');
const PostFiles = require('../models/post_files');
const Posttags = require('../models/post_tags');
const Tags = require('../models/tags');
const PostCategories = require('../models/post_category');

router.get('/show', async (req,res) => {

    const data = await categories.findAll({
        where:{
            parent_id:0,
            show_on_menu:1
        },
        include:[
            {
                model:categories,
                as:'SubCategories'
            }
        ]
    });

    return res.status(200).json(data);

});

router.get('/posts', async (req,res) => {

    const page = parseInt(req.query.page) || 1;

    const limit = 10; // Number of items to fetch per page
    
    const offset = (page - 1) * limit;

    const data = await categories.findAll({
        where:{
            parent_id:0,
            // show_at_homepage:1
        },
        include:[
            {
                model:PostCategories,
                limit:limit,
                offset:offset,
                subQuery:true,
                include:[
                    {
                        model:categories, attributes:['id','name','name_slug'],
                        include:[
                            {
                                model:categories,
                                as:'SubCategories',
                                attributes:['id','name','name_slug']
                            }
                        ]
                    },
                    {
                        model:Posts,
                        include:[
                            {
                                model:PostImages
                            },
                            {
                                model:users,
                                attributes:['id','username','email']
                            },
                            {
                                model:PostFiles
                            }
                        ],
                        // limit:5,
                       
                    },
                ],
                order:[
                    [
                        'id',
                        'DESC'
                    ]
                ]
                
            },
            
            {
                model:categories,
                as:'SubCategories',
                where:{
                    // show_at_homepage:1 
                },
                include:[
                    {
                        model:PostCategories,
                        limit:limit,
                        offset:offset,
                        subQuery:true,
                        include:[
                            {
                                model:categories, attributes:['id','name','name_slug'],
                                include:[
                                    {
                                        model:categories,
                                        as:'SubCategories',
                                        attributes:['id','name','name_slug']
                                    }
                                ]
                            },
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
                                        attributes:['id','username','email']
                                    },
                                    {
                                        model:PostFiles
                                    }
                                ],
                                // limit:5
                            }
                        ],
                        order:[
                            [
                                'id',
                                'DESC'
                            ]
                        ]
                    }
                   
                ]
            }
        ]
    });

    return res.status(200).json(data);

});


router.get('/:slug', async (req,res) => {

    const slug = req.params.slug;

    const page = parseInt(req.query.page) || 1;

    const limit = 10; // Number of items to fetch per page
    
    const offset = (page - 1) * limit;

    const data = await categories.findAll({
        where:{
            name_slug:slug
        },
       
        include:[
            {
                model:PostCategories,
                offset:offset,
                limit:limit,
                subQuery:true,
                include:[
                    {
                        model:categories, attributes:['id','name','name_slug'],
                        include:[
                            {
                                model:categories,
                                as:'SubCategories',
                                attributes:['id','name','name_slug']
                            }
                        ]
                    },
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
                                attributes:['id','username','email']
                            },
                            {
                                model:PostFiles
                            }
                        ]
                    }
                ],
                order:[
                    [
                        'id',
                        'DESC'
                    ]
                   
                ]
            }
            
        ]
    });

    return res.status(200).json(data);

});




module.exports = router;