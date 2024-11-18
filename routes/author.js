const express = require('express');
const users = require('../models/users');
const router = express.Router();

router.get('/:slug',async(req,res) => {

    const slug = req.params.slug;
    
    const data = await users.findOne({
        where:{
            slug:slug
        }
    });
    
    return res.status(200).json(data);
    
});

module.exports = router;