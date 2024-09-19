const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const Posts = require('../models/posts');
const PostFiles = require('../models/post_files');
const categories = require('../models/categories');
const pages = require('../models/pages');


router.get('/:slug',async (req,res) => {

    const slug = req.params.slug;

    const data = await pages.findOne({
        where:{
            slug:slug
        }
    })

    return res.status(200).json(data);

});

module.exports = router;