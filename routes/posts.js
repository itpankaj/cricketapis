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

module.exports = router;