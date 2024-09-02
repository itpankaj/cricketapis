const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const Posts = require('../models/posts');
const PostFiles = require('../models/post_files');

router.get('/all', async (req,res) => {

    const data = await Posts.findAll({
        include:[
            {
                model:PostFiles
            }
        ],
        limit:10});

    return res.status(200).json(data);

});


router.get('/homepage/slider-image', async (req,res) => {

    const data = await Posts.findAll({
        where:{
            is_slider:1
        },
        include:[
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


router.get('/homepage/featured', async (req,res) => {

    const data = await Posts.findAll({
        where:{
            is_featured:1
        },
        include:[
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
    
    const slug = req.params.slug;

    const data = await Posts.findOne({
        where:{
            title_slug:slug
        },
        include:[
            {
                model:PostFiles
            }
        ]
    });

    return res.status(200).json(data);

});


module.exports = router;