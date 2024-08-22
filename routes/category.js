const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const categories = require('../models/categories');

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

module.exports = router;