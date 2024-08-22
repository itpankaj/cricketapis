const express = require('express');
const router  = express.Router();
const {body,validationResult,param} = require('express-validator');
const CitiesModel = require('../models/CitiesModel');
var { Op } = require('sequelize');


router.get('/',async (req,res) => {

    const q = req.query.q;

    var cities = [];

    if(!q) {

         cities = await CitiesModel.findAll({limit:50,order:[['name','ASC']],attributes:['name','id','state_id'],where:{
            status:1
         }});

    } else {

         cities = await CitiesModel.findAll({limit:50,order:[['name','ASC']],attributes:['name','id','state_id'],
        where:{
            name:{
                [Op.like]:`%${q}%`
            },
            status:1
        }});

    }
 

    res.status(200).json(cities);
});

module.exports = router;