const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const categories = require('../models/categories');
const Posts = require('../models/posts');
const PostImages = require('../models/post_images');
const users = require('../models/users');
const PostFiles = require('../models/post_files');

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
                limit:5
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

    const data = await categories.findOne({
        where:{
            name_slug:slug
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
                ]
            }
        ]
    });

    return res.status(200).json(data);

});




module.exports = router;