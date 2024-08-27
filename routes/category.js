const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const categories = require('../models/categories');
const Posts = require('../models/posts');

router.get('/show', async (req,res) => {

    const data = await categories.findAll({
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
            show_at_homepage:1
        },
        include:[
            {
                model:Posts,
                limit:5
            }
        ]
    });

    return res.status(200).json(data);

});




module.exports = router;