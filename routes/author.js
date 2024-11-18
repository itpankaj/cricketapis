const express = require('express');
const users = require('../models/users');
const Posts = require('../models/posts');
const Posttags = require('../models/post_tags');
const Tags = require('../models/tags');
const PostImages = require('../models/post_images');
const PostFiles = require('../models/post_files');
const router = express.Router();

router.get('/:slug',async(req,res) => {

    const slug = req.params.slug;

    const page = parseInt(req.query.page) || 1;

    const limit = 10; // Number of items to fetch per page
    
    const offset = (page - 1) * limit;
    
    const data = await users.findAll({
       
        include:[
            {
                model:Posts,
                offset:offset,
                limit:limit,
                subQuery:true,
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
                order:[
                    [
                        'id',
                        'DESC'
                    ]
                ]
            }
        ],
        where:{
            slug:slug
        }
    });
    
    return res.status(200).json(data);
    
});

module.exports = router;