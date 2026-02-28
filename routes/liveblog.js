const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const LiveBlogs = require('../models/live_blogs');
const LiveBlogEntries = require('../models/live_blog_entries');
const users = require('../models/users');
const categories = require('../models/categories');

// Set up associations for includes
LiveBlogs.hasMany(LiveBlogEntries, { foreignKey: 'live_blog_id', as: 'entries' });

const SITE_BASE_URL = 'https://www.icccricketschedule.com';
const SITE_NAME = 'ICC Cricket Schedule';
const IMG_BASE_URL = 'https://img.icccricketschedule.com';

/**
 * Helper: Build image URL from blog data
 */
function getBlogImageUrl(blog) {
    if (blog.image_url) return blog.image_url;
    if (blog.image_cloud) return blog.image_cloud;
    if (blog.image_big) {
        if (blog.image_storage === 'aws_s3') return blog.image_big;
        return IMG_BASE_URL + '/' + blog.image_big.replace(/^\//, '');
    }
    return null;
}

/**
 * Helper: Build JSON-LD LiveBlogPosting structured data
 * https://schema.org/LiveBlogPosting
 * https://developers.google.com/search/docs/appearance/structured-data/live-blog
 */
function buildJsonLd(blog, entries, authorData) {
    const blogUrl = SITE_BASE_URL + '/' + blog.title_slug + '/';
    const imageUrl = getBlogImageUrl(blog);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LiveBlogPosting',
        '@id': blogUrl,
        'headline': blog.title,
        'description': blog.summary || blog.title,
        'url': blogUrl,
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': blogUrl
        },
        'datePublished': blog.started_at || blog.createdAt,
        'dateModified': blog.updatedAt || blog.createdAt,
        'coverageStartTime': blog.started_at || blog.createdAt,
        'author': {
            '@type': 'Person',
            'name': authorData ? (authorData.first_name || authorData.username) : SITE_NAME,
            'url': authorData ? (SITE_BASE_URL + '/author/' + (authorData.slug || authorData.username) + '/') : SITE_BASE_URL
        },
        'publisher': {
            '@type': 'Organization',
            'name': SITE_NAME,
            'url': SITE_BASE_URL,
            'logo': {
                '@type': 'ImageObject',
                'url': SITE_BASE_URL + '/logo.png'
            }
        },
        'inLanguage': 'en',
        'isAccessibleForFree': true
    };

    if (blog.ended_at || blog.status === 2) {
        jsonLd.coverageEndTime = blog.ended_at || blog.updatedAt;
    }

    if (imageUrl) {
        jsonLd.image = {
            '@type': 'ImageObject',
            'url': imageUrl
        };
        jsonLd.thumbnailUrl = imageUrl;
    }

    if (blog.keywords) {
        jsonLd.keywords = blog.keywords;
    }

    // Add liveBlogUpdate entries
    if (entries && entries.length > 0) {
        jsonLd.liveBlogUpdate = entries.map(entry => {
            const entryLd = {
                '@type': 'BlogPosting',
                'headline': entry.title || (entry.content ? entry.content.substring(0, 110) : ''),
                'datePublished': entry.createdAt,
                'dateModified': entry.updatedAt || entry.createdAt,
                'articleBody': entry.content,
                'author': {
                    '@type': 'Person',
                    'name': entry.user ? (entry.user.first_name || entry.user.username) : SITE_NAME
                }
            };
            if (entry.image_url) {
                entryLd.image = { '@type': 'ImageObject', 'url': entry.image_url };
            }
            return entryLd;
        });
    }

    return jsonLd;
}

/**
 * GET /liveblog/active
 * Get all currently live blogs (status=1) - for homepage/sidebar widgets
 */
router.get('/active', async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 10, 50);

        const data = await LiveBlogs.findAll({
            where: { status: 1 },
            include: [
                { model: users, attributes: ['id', 'username', 'first_name', 'last_name', 'slug', 'avatar'] },
                { model: categories, attributes: ['id', 'name', 'name_slug'] }
            ],
            order: [['is_pinned', 'DESC'], ['updated_at', 'DESC']],
            limit: limit
        });

        return res.status(200).json({
            success: true,
            data: data,
            count: data.length
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * GET /liveblog/recent
 * Get recent live blogs (live + ended) - for live blog listing page
 */
router.get('/recent', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 10, 50);
        const offset = (page - 1) * limit;

        const { count, rows } = await LiveBlogs.findAndCountAll({
            where: { status: { [Op.in]: [1, 2] } },
            include: [
                { model: users, attributes: ['id', 'username', 'first_name', 'last_name', 'slug', 'avatar'] },
                { model: categories, attributes: ['id', 'name', 'name_slug'] }
            ],
            order: [['status', 'ASC'], ['is_pinned', 'DESC'], ['updated_at', 'DESC']],
            limit: limit,
            offset: offset
        });

        return res.status(200).json({
            success: true,
            data: rows,
            total: count,
            page: page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * GET /liveblog/all
 * Get all non-draft live blogs for archive/listing
 */
router.get('/all', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 15, 50);
        const offset = (page - 1) * limit;
        const status = req.query.status;
        const categorySlug = req.query.category;

        let whereCondition = { status: { [Op.in]: [1, 2, 3] } };
        if (status !== undefined && status !== '') {
            whereCondition.status = parseInt(status);
        }

        let categoryWhere = {};
        if (categorySlug) {
            categoryWhere.name_slug = categorySlug;
        }

        const { count, rows } = await LiveBlogs.findAndCountAll({
            where: whereCondition,
            include: [
                { model: users, attributes: ['id', 'username', 'first_name', 'last_name', 'slug', 'avatar'] },
                { model: categories, attributes: ['id', 'name', 'name_slug'], where: categorySlug ? categoryWhere : undefined, required: !!categorySlug }
            ],
            order: [['status', 'ASC'], ['is_pinned', 'DESC'], ['updated_at', 'DESC']],
            limit: limit,
            offset: offset
        });

        return res.status(200).json({
            success: true,
            data: rows,
            total: count,
            page: page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * GET /liveblog/slug/:slug(*)
 * Get a single live blog by slug with entries and JSON-LD
 * This is the main endpoint for the frontend live blog page
 * Supports slugs with slashes (e.g. "live/india-vs-...")
 */
router.get('/slug/*', async (req, res) => {
    try {
        const rawSlug = (req.params[0] || '').replace(/^\/+|\/+$/g, '');

        // Try exact match first, then with/without 'live/' prefix
        const slugsToTry = [rawSlug];
        if (!rawSlug.startsWith('live/')) slugsToTry.push('live/' + rawSlug);
        if (rawSlug.startsWith('live/')) slugsToTry.push(rawSlug.replace(/^live\//, ''));

        let blog = null;
        for (const trySlug of slugsToTry) {
            blog = await LiveBlogs.findOne({
                where: { title_slug: trySlug },
                include: [
                    { model: users, attributes: ['id', 'username', 'first_name', 'last_name', 'slug', 'avatar'] },
                    { model: categories, attributes: ['id', 'name', 'name_slug'] }
                ]
            });
            if (blog) break;
        }

        if (!blog) {
            return res.status(404).json({ success: false, error: 'Live blog not found' });
        }

        // Get entries
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 50, 200);
        const offset = (page - 1) * limit;

        const { count: totalEntries, rows: entries } = await LiveBlogEntries.findAndCountAll({
            where: { live_blog_id: blog.id },
            include: [
                { model: users, attributes: ['id', 'username', 'first_name', 'last_name', 'slug', 'avatar'] }
            ],
            order: [['is_pinned', 'DESC'], ['created_at', 'DESC']],
            limit: limit,
            offset: offset
        });

        // Get key events separately
        const keyEvents = await LiveBlogEntries.findAll({
            where: { live_blog_id: blog.id, is_key_event: 1 },
            include: [
                { model: users, attributes: ['id', 'username', 'first_name', 'last_name'] }
            ],
            order: [['created_at', 'DESC']],
            limit: 50
        });

        // Build JSON-LD structured data
        const jsonLd = buildJsonLd(blog, entries, blog.user);

        return res.status(200).json({
            success: true,
            blog: blog,
            entries: entries,
            keyEvents: keyEvents,
            totalEntries: totalEntries,
            page: page,
            totalPages: Math.ceil(totalEntries / limit),
            jsonLd: jsonLd,
            seo: {
                title: blog.title + ' - Live Blog | ' + SITE_NAME,
                description: blog.summary || blog.title,
                keywords: blog.keywords || '',
                canonicalUrl: SITE_BASE_URL + '/' + blog.title_slug + '/',
                ogType: 'article',
                ogImage: getBlogImageUrl(blog),
                twitterCard: 'summary_large_image'
            }
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * GET /liveblog/:id/entries
 * Get entries for a live blog (for polling/real-time updates)
 * Supports ?since=timestamp to get only new entries
 */
router.get('/:id/entries', async (req, res) => {
    try {
        // Prevent caching for polling endpoints
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Surrogate-Control', 'no-store');
        const blogId = parseInt(req.params.id);
        const since = req.query.since; // ISO timestamp
        const keyEventsOnly = req.query.key_events === '1';
        const limit = Math.min(parseInt(req.query.limit) || 50, 200);

        let whereCondition = { live_blog_id: blogId };

        if (since) {
            whereCondition.created_at = { [Op.gt]: new Date(since) };
        }

        if (keyEventsOnly) {
            whereCondition.is_key_event = 1;
        }

        const entries = await LiveBlogEntries.findAll({
            where: whereCondition,
            include: [
                { model: users, attributes: ['id', 'username', 'first_name', 'last_name', 'avatar'] }
            ],
            order: [['is_pinned', 'DESC'], ['created_at', 'DESC']],
            limit: limit
        });

        // Get blog updated_at for client-side cache check
        const blog = await LiveBlogs.findByPk(blogId, {
            attributes: ['id', 'status', 'match_info', 'updated_at', 'entry_count']
        });

        return res.status(200).json({
            success: true,
            entries: entries,
            count: entries.length,
            blogStatus: blog ? blog.status : null,
            matchInfo: blog ? blog.match_info : null,
            entryCount: blog ? blog.entry_count : 0,
            lastUpdated: blog ? blog.updated_at : null
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * GET /liveblog/:id/jsonld
 * Get only the JSON-LD structured data for a live blog
 * Useful for dynamic injection in SSR/SSG frontends
 */
router.get('/:id/jsonld', async (req, res) => {
    try {
        const blogId = parseInt(req.params.id);

        const blog = await LiveBlogs.findByPk(blogId, {
            include: [
                { model: users, attributes: ['id', 'username', 'first_name', 'last_name', 'slug'] },
                { model: categories, attributes: ['id', 'name', 'name_slug'] }
            ]
        });

        if (!blog) {
            return res.status(404).json({ success: false, error: 'Live blog not found' });
        }

        const entries = await LiveBlogEntries.findAll({
            where: { live_blog_id: blogId },
            include: [{ model: users, attributes: ['id', 'username', 'first_name'] }],
            order: [['created_at', 'DESC']],
            limit: 100
        });

        const jsonLd = buildJsonLd(blog, entries, blog.user);

        // Return as application/ld+json for direct embedding
        res.setHeader('Content-Type', 'application/ld+json');
        return res.status(200).json(jsonLd);
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * GET /liveblog/featured
 * Get featured live blogs for homepage highlight
 */
router.get('/featured', async (req, res) => {
    try {
        const data = await LiveBlogs.findAll({
            where: { is_featured: 1, status: { [Op.in]: [1, 2] } },
            include: [
                { model: users, attributes: ['id', 'username', 'first_name', 'last_name', 'slug', 'avatar'] },
                { model: categories, attributes: ['id', 'name', 'name_slug'] }
            ],
            order: [['status', 'ASC'], ['updated_at', 'DESC']],
            limit: 5
        });

        return res.status(200).json({ success: true, data: data });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
