const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
var { Op, where } = require('sequelize');
const sequelize = require('../connection/connection');
const AdSpace = require('../models/ad_spaces');


router.get('/:slug', async (req, res) => {

    const slug = req.params.slug;

    const data = await AdSpace.findOne({
        where:{
            ad_space:slug
        }
    });

    return res.status(200).json(data);

});