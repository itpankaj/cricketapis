const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const upload = multer({ dest: 'uploads/' });
const path = require("path");
const fs = require("fs");

router.post('/', async (req, res) => {

    console.log(req);

    const { image } = req.files;

    if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    if (!/^image/.test(image.mimetype)) return res.sendStatus(400);

    image.mv(__dirname + '/uploads/' + image.name+'.'+image.mimetype);

    res.status(200).json({path:  '/uploads/' + image.name});
   
});

module.exports = router;