const express = require('express');
const ArticleModel = require('../models/ArticleModel');
const AuthorModel = require('../models/AuthorModel');
const ExamsModel = require('../models/ExamsModel');
const router = express.Router();


router.get('',async(req,res) => {

const data = await AuthorModel.findAll({
    include:[
        {
            model:ArticleModel,
            include:[
                {
                    model:ExamsModel,
                    attributes:['id','name']
                }
            ]
        },
    ]
});

return res.status(200).json(data);

});



router.get('/exam/:examId',async(req,res) => {

    const id = req.params.examId;

    const data = await AuthorModel.findAll({
        include:[
            {
                model:ArticleModel,
                include:[
                    {
                        model:ExamsModel,
                        attributes:['id','name'],
                        
                    }
                ],
                where:{
                    examId:id
                }
            },
        ]
    });
    
    return res.status(200).json(data);
    
    });


router.get('/:id',async(req,res) => {

    const id = req.params.id;
    
    const data = await AuthorModel.findOne({
        include:[
            {
                model:ArticleModel,
                include:[
                    {
                        model:ExamsModel,
                        attributes:['id','name']
                    }
                ]
            }
            
        ],
        where:{
            id:id
        }
    });
    
    return res.status(200).json(data);
    
});



module.exports = router;