const express = require('express');

const menuModel = require('../models/menuModel');
const subMenuModel = require('../models/subMenuModel');

const router = express.Router();

router.get('',async(req,res) => {

const data = await menuModel.findAll({

    include:[
        {
            model:subMenuModel
        }
    ]
   
});

return res.status(200).json(data);

});

module.exports = router;