const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const Posts = require('../models/posts');
const PostFiles = require('../models/post_files');
const categories = require('../models/categories');
var { Op, where } = require('sequelize');

router.get('/all', async (req,res) => {

    const search = req.query.search;

    var whereCondition = {};

    const offset = (req.query.page == 1) ? 0 : (req.query.page-1) * 20;

    const limit = 20;

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

        offset:offset,

        include:[
            {
                model:PostFiles
            }
        ],
        
      }
    );

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
                model:categories
            },
            {
                model:PostFiles
            }
        ]
    });

    return res.status(200).json(data);

});


module.exports = router;