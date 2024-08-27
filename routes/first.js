const express = require('express');
const SeoModel = require('../models/SeoModel');
const path = require('path');
const router = express.Router();
const fs = require('fs');


router.get('(*?)',async(req,res) => {

    console.log(req);

    console.log(req.path);

    const seoTags = await SeoModel.findOne({where:{
        slug:req.path
    }});

    const indexFilePath = path.resolve("/var/www/html/index.html");

    fs.readFile(indexFilePath, "utf8", (err, data) => {
        if (err) {
          return console.log(err);
        }

        if(seoTags) {
            console.log("data");

            data = data
            .replace(/name="description"/g, 'name="description" content="'+seoTags.metaDescription+'"')
            .replace(/name="keywords"/g, 'name="keywords" content="'+seoTags.metaKeyword+'"');
        }

        res.send(data)
    });

});

module.exports = router;