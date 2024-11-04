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

router.get('/show', async (req,res) => {

    const data = await categories.findAll({
        where:{
            parent_id:0
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

    const data = await categories.findAll({
        where:{
            parent_id:0,
            show_at_homepage:1
        },
        include:[
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
                        model:PostFiles
                    }
                ],
                limit:5,
               
            },
            {
                model:categories,
                as:'SubCategories',
                where:{
                    show_at_homepage:1 
                },
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
                                attributes:['id','username','email']
                            },
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
                                model:PostFiles
                            }
                        ],
                        limit:5
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

    const limit = 5; // Number of items to fetch per page
    
    const offset = (page - 1) * limit;

    const data = await categories.findOne({
        where:{
            name_slug:slug
        },
        subQuery:false,
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
                        attributes:['id','username','email']
                    },
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
                        model:PostFiles
                    }
                ],
                limit:limit,
                offset:offset
            }
        ]
    });

    return res.status(200).json(data);

});




module.exports = router;