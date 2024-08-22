const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const sequelize = require('../connection/connection');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Users = require('../models/users');
/* POST login. */
router.post('/login', 
body('email').notEmpty(),
body('password').notEmpty(),

async (req, res)  => {

    const Result = validationResult(req);

    if (!Result.isEmpty()) {
        return res.status(422).json({ errors: Result.array() });
    }


    var user = await Users.findOne({where:{
        email:req.body.email
    }});

    if (!user) {
        return res.status(401).json({message:"This email address is not registered with us"});
   }
    const hashedPassword = await bcrypt.compare(req.body.password,user.password);

    if(!hashedPassword) {
        return res.status(401).json({message:"Either the password or email address is invalid"});
    }

    const token = jwt.sign(user.toJSON(), '23089423948askldfjhasdkh234987');

    await Users.update(
     {
         lastLogin: new Date()
     },
     {
     where:{
         id:user.id
     }
    
    });

    return res.json({user, token});
});


router.post('/social/login', 
body('socialId').notEmpty(),
async (req, res)  => {

    const Result = validationResult(req);

    if (!Result.isEmpty()) {
        return res.status(422).json({ errors: Result.array() });
      }

    const id = req.body.socialId;

    var user = await Users.findOne({where:{
        socialId:id
    }});

    if (!user) {

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(id, saltRounds);

          var data = {
            firstName: "---",
            lastName: "--",
            email: req.body.email,
            mobile: "----",
            password: hashedPassword,
            cityId: null,
            stateId: null,
            address: null,
            gender: null,
            terms: null,
            socialId:id
          }
      
        user = await UserModel.create(data);
        
    }

    const token = jwt.sign(user.toJSON(), '23089423948askldfjhasdkh234987');

    await Users.update(
     {
         lastLogin: new Date()
     },
     {
     where:{
         id:user.id
     }
    
    });

    return res.json({user, token});

});


module.exports = router;