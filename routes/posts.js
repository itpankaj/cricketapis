const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const Posts = require('../models/posts');
const PostFiles = require('../models/post_files');
const categories = require('../models/categories');
var { Op, where } = require('sequelize');
const users = require('../models/users');
const PostImages = require('../models/post_images');
const sequelize = require('../connection/connection');
const PostPageViewMonth = require('../models/post_pageviews_month');
const Posttags = require('../models/post_tags');
const Tags = require('../models/tags');
const PostCategories = require('../models/post_category');

router.get('/all', async (req, res) => {

    try {

        const search = req.query.search;

        var whereCondition = {status:1};

        const offset = (req.query.page == 1) ? 0 : (req.query.page - 1) * 5;

        const limit = 10;

        if (search) {

            const searchKewords = search.split(' ');

            const searchArr = [];

            for (itemSerch of searchKewords) {

                const item = {
                    title: {
                        [Op.like]: '%' + itemSerch + '%'
                    }
                }

                searchArr.push(item)

            }

            whereCondition = {
                [Op.and]: searchArr,
                status:1
            }

        }

        const data = await Posts.findAll({
            include:[
                {
                    model: users,
                    attributes: ['id', 'username', 'email','first_name','last_name','slug','avatar']
                }
            ],

            where: whereCondition,

            limit: limit,

            offset: offset,

            order: [
                [
                    'id',
                    'DESC'
                ]
            ],

        }
        );

        const totalPosts = await Posts.count();

        return res.status(200).json({ data: data, total: totalPosts });


    } catch (err) {
        return res.json({ 'error': err.message });
    }



});


router.get('/homepage/slider-image', async (req, res) => {

    const data = await Posts.findAll({
        where: {
            is_slider: 1,
            status:1
        },
        include: [
            {
                model: Posttags,
                attributes: ['id'],
                include: [
                    {
                        model: Tags
                    }
                ]
            },
            {
                model: PostImages
            },
            {
                model: users,
                attributes: ['id', 'username', 'email','first_name','last_name','slug','avatar']
            },
            {
                model: PostCategories,
                include: [
                    {
                        model: categories,
                        attributes: ['id', 'name', 'name_slug'],
                        include: [
                            {
                                model: categories,
                                as: 'SubCategories',
                                attributes: ['id', 'name', 'name_slug']
                            }
                        ]
                    },
                ]
            },

            {
                model: PostFiles
            }
        ],
        order: [
            [
                'slider_order',
                'ASC'
            ]
        ],
        limit: 10
    });

    return res.status(200).json(data);

});



router.get('/homepage/recommended/:slug', async (req, res) => {

    const slug = req.params.slug;

    let data = [];

    const categoryId = await categories.findOne({
        where: {
            name_slug: slug
        }
    })

    if (categoryId) {

        data = await PostCategories.findAll({
            where: {
                catId: categoryId.id
            },
            limit: 10,
            subQuery: true,
            include: [
                {
                    model: categories, attributes: ['id', 'name', 'name_slug'],
                    include: [
                        {
                            model: categories,
                            as: 'SubCategories',
                            attributes: ['id', 'name', 'name_slug']
                        }
                    ]
                },
                {
                    model: Posts,
                    where:{
                        is_recommended:1,
                        status:1
                    },
                    include: [
                        {
                            model: Posttags,
                            attributes: ['id'],
                            include: [
                                {
                                    model: Tags
                                }
                            ]
                        },
                        {
                            model: PostImages
                        },
                        {
                            model: users,
                            attributes: ['id', 'username', 'email','first_name','last_name','slug','avatar']
                        },
                        {
                            model: PostFiles
                        }
                    ],
                    // limit:5,

                },
            ],
            order: [
                [
                    'id',
                    'DESC'
                ]
            ]
        })

    }


    return res.status(200).json(data);

});


router.get('/homepage/featured', async (req, res) => {

    const data = await Posts.findAll({
        where: {
            is_featured: 1,
            status:1
        },
        include: [
            {
                model: Posttags,
                attributes: ['id'],
                include: [
                    {
                        model: Tags
                    }
                ]
            },
            {
                model: PostImages
            },
            {
                model: users,
                attributes: ['id', 'username', 'email','first_name','last_name','slug','avatar']
            },
            {
                model: PostCategories,
                include: [
                    {
                        model: categories,
                        attributes: ['id', 'name', 'name_slug'],
                        include: [
                            {
                                model: categories,
                                as: 'SubCategories',
                                attributes: ['id', 'name', 'name_slug']
                            }
                        ]
                    },
                ]
            },
            {
                model: PostFiles
            }
        ],
        order: [
            [
                'featured_order',
                'ASC'
            ]
        ],
        limit: 10
    });

    return res.status(200).json(data);

});

// NEW: Dedicated endpoint for Next.js static generation
// Returns only slugs for recent articles (default 500)
// IMPORTANT: Must be BEFORE /:slug route to avoid being caught by it
router.get('/recent-slugs', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 500;
        const finalLimit = Math.min(limit, 2000); // Cap at 2000

        const data = await Posts.findAll({
            attributes: ['title_slug'], // Only slug, nothing else
            where: {
                status: 1
            },
            order: [
                ['createdAt', 'DESC'] // Newest first
            ],
            limit: finalLimit,
            raw: true
        });

        // Return array of slugs
        const slugs = data.map(post => post.title_slug);

        return res.status(200).json(slugs);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Optimized endpoint for static generation - returns only slugs
// IMPORTANT: Must be BEFORE /:slug route to avoid being caught by it
router.get('/all-slugs', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 1000;
        const finalLimit = Math.min(limit, 5000);

        const data = await Posts.findAll({
            attributes: ['title_slug', 'createdAt'], // Only fetch what we need
            where: {
                status: 1
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: finalLimit,
            raw: true // Return plain objects for better performance
        });

        // Extract just the slugs
        const slugs = data.map(post => post.title_slug);

        return res.status(200).json(slugs);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get('/latest/news', async (req, res) => {

    // Get limit from query parameter, default to 15 for backward compatibility
    const limit = parseInt(req.query.limit) || 15;
    
    // Cap at 5000 to prevent memory issues
    const finalLimit = Math.min(limit, 5000);

    const data = await Posts.findAll({
        where:{
            status:1
        },
        
        include: [
            {
                model: Posttags,
                attributes: ['id'],
                include: [
                    {
                        model: Tags
                    }
                ]
            },
            {
                model: PostImages
            },
            {
                model: users,
                attributes: ['id', 'username', 'email','first_name','last_name','slug','avatar']
            },
            {
                model: PostCategories,
                include: [
                    {
                        model: categories,
                        attributes: ['id', 'name', 'name_slug'],
                        include: [
                            {
                                model: categories,
                                as: 'SubCategories',
                                attributes: ['id', 'name', 'name_slug']
                            }
                        ]
                    },
                ]
            },
            {
                model: PostFiles
            }
        ],
        order: [
            [
                'createdAt',  // Sort by creation date instead of ID
                'DESC'
            ]
        ],
        limit: finalLimit
    });

    return res.status(200).json(data);

});

// IMPORTANT: Catch-all /:slug route MUST be LAST
// Otherwise it catches all other routes like /recent-slugs, /all-slugs, etc.
router.get('/:slug', async (req, res) => {


    try {

        const slug = req.params.slug;

        const previewItem = req.query.preview;

        var whereCondition = {
            title_slug:slug,
            status:1
        }

        if(previewItem) {
            
            whereCondition = {
                title_slug:slug
            }
        }

        const data = await Posts.findOne({
            where: whereCondition,
            include: [

                {
                    model: Posttags,
                    attributes: ['id'],
                    include: [
                        {
                            model: Tags
                        }
                    ]
                },
                {
                    model: PostImages
                },
                {
                    model: users,
                    attributes: ['id', 'username', 'email','first_name','last_name','slug','avatar']
                },
                {
                    model: PostCategories,
                    include: [
                        {
                            model: categories,
                            attributes: ['id', 'name', 'name_slug'],
                            include: [
                                {
                                    model: categories,
                                    as: 'SubCategories',
                                    attributes: ['id', 'name', 'name_slug']
                                }
                            ]
                        },
                    ]
                },
                {
                    model: PostFiles
                }
            ]
        });

        if (!data) {
            return res.status(404).json({ message: "post not found" });
        }

        // add post view record

        // [INSERT] post_pageviews_month - Records a new pageview when user accesses a post via GET /posts/:slug
        await PostPageViewMonth.create({
            post_id: data.id,

        });

        // [SELECT] post_pageviews_month - Counts total pageviews for the post to return view count
        const count = await PostPageViewMonth.count({
            where: {
                post_id: data.id
            }
        });

        return res.status(200).json({ data: data, count: count });

    } catch (error) {

        return res.json({ 'message': error.message })
    }



});

module.exports = router;