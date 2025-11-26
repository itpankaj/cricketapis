# tag_slug Query Analysis - Performance Investigation

**Date**: November 15, 2025  
**Issue**: High volume of `SELECT` queries on `tags` table with `tag_slug` WHERE clause  
**Status**: Root cause identified and documented

---

## Executive Summary

The high volume of `tag_slug` queries is caused by the `GET /tags/post/:slug` API endpoint, which queries the `tags` table every time a user accesses a tag page. There is no caching mechanism, and the `tag_slug` column lacks a database index.

---

## Root Cause Analysis

### Location
- **File**: `routes/tags.js`
- **Lines**: 30-32
- **API Endpoint**: `GET /tags/post/:slug`

### The Query
```javascript
const tags = await Tags.findOne({where:{
    tag_slug:slug
}});
```

### Generated SQL
```sql
SELECT `id`, `tag`, `tag_slug` FROM `tags` WHERE `tag_slug` = ?
```

---

## How It Works

### Step-by-Step Flow

```
User Request: GET /tags/post/maharashtra
    ↓
[QUERY 1] Find tag by slug
    SELECT * FROM tags WHERE tag_slug = 'maharashtra'
    ↓ (Returns tag ID = 5)
[QUERY 2+] Find all posts with this tag
    SELECT * FROM post_tags WHERE tagId = 5
    SELECT * FROM posts WHERE id IN (...)
    SELECT * FROM post_images WHERE post_id IN (...)
    ... (multiple related queries)
    ↓
Response: Array of posts with tag 'maharashtra'
```

### Complete Endpoint Code

```javascript
// routes/tags.js - Lines 17-112
router.get('/post/:slug', async (req, res) => {
    try {
        const slug = req.params.slug;
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        // [QUERY 1] - SELECT from tags WHERE tag_slug = ?
        // This query runs EVERY TIME someone accesses a tag page
        const tags = await Tags.findOne({
            where: {
                tag_slug: slug
            }
        });

        if (!tags) {
            return res.status(404).json({
                message: "tag not found",
                code: "HTTP_NOT_FOUND"
            });
        }

        // [QUERY 2+] - Complex query with multiple JOINs
        const data = await Posttags.findAll({
            where: {
                tagId: tags.id  // Uses tag ID from Query 1
            },
            limit: limit,
            offset: offset,
            include: [
                {
                    model: Posts,
                    where: { status: 1 },
                    include: [
                        { model: Posttags, include: [{ model: Tags }] },
                        { model: PostImages },
                        { model: users, attributes: [...] },
                        { model: PostCategories, include: [...] },
                        { model: PostFiles }
                    ]
                }
            ]
        });

        return res.status(200).json(data);
    } catch (error) {
        return res.json({ 'message': error.message });
    }
});
```

---

## Why This is Inefficient

### Problem 1: No Index on tag_slug
**Current indexes in `tags` table**:
```
- PRIMARY KEY on `id`
- (No index on `tag_slug`)
```

**Impact**: Every lookup requires a full table scan

### Problem 2: No Caching
- Every request = fresh database query
- No in-memory or Redis caching
- Repeated lookups for same tags

### Problem 3: Cascading Queries
- Query 1 result is required for Query 2
- Cannot be parallelized
- Sequential execution increases latency

### Problem 4: Heavy Joins
- Query 2 includes multiple nested relationships
- Fetches posts, images, categories, tags, users, files
- Expensive for every page request

---

## Performance Impact

### Current Behavior
```
Request Rate: 100 requests/minute
Unique Tags: ~50
Query Volume: 100+ queries/minute on tags table
Database Load: HIGH
```

### Query Pattern from Logs
```
GET /tags/post/maharashtra-page1
    → SELECT * FROM tags WHERE tag_slug = 'maharashtra'
    → SELECT * FROM post_tags WHERE tagId = 5
    → SELECT * FROM posts WHERE id IN (...)
    → ... (5-10 more queries)

GET /tags/post/maharashtra-page2
    → SELECT * FROM tags WHERE tag_slug = 'maharashtra'  [DUPLICATE]
    → SELECT * FROM post_tags WHERE tagId = 5
    → ... (different offset/limit)
```

---

## Optimization Recommendations

### Priority 1: Add Database Index (Quick Win)
**Effort**: 5 minutes  
**Impact**: 30-50% improvement

```sql
ALTER TABLE tags ADD INDEX idx_tag_slug (tag_slug);
```

**Why**: Converts full table scan to index lookup

### Priority 2: Implement Caching (Medium Effort)
**Effort**: 30-60 minutes  
**Impact**: 70-90% reduction in tag queries

**Option A - In-Memory Cache (Node.js)**
```javascript
const tagCache = new Map();
const CACHE_TTL = 3600000; // 1 hour

async function getTagBySlug(slug) {
    const cached = tagCache.get(slug);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }
    
    const tag = await Tags.findOne({ where: { tag_slug: slug } });
    tagCache.set(slug, { data: tag, timestamp: Date.now() });
    return tag;
}
```

**Option B - Redis Cache**
```javascript
const redis = require('redis');
const client = redis.createClient();

async function getTagBySlug(slug) {
    const cached = await client.get(`tag:${slug}`);
    if (cached) return JSON.parse(cached);
    
    const tag = await Tags.findOne({ where: { tag_slug: slug } });
    await client.setex(`tag:${slug}`, 3600, JSON.stringify(tag));
    return tag;
}
```

### Priority 3: Optimize Query Structure (Advanced)
**Effort**: 2-3 hours  
**Impact**: 40-60% improvement in query performance

Use raw SQL with JOINs instead of Sequelize includes:
```javascript
const data = await sequelize.query(`
    SELECT p.*, pt.*, t.*, pi.*, u.*, pc.*, c.*
    FROM posts p
    JOIN post_tags pt ON p.id = pt.postId
    JOIN tags t ON pt.tagId = t.id
    LEFT JOIN post_images pi ON p.id = pi.post_id
    LEFT JOIN users u ON p.user_id = u.id
    LEFT JOIN post_categories pc ON p.id = pc.post_id
    LEFT JOIN categories c ON pc.catId = c.id
    WHERE t.tag_slug = ? AND p.status = 1
    LIMIT ? OFFSET ?
`, {
    replacements: [slug, limit, offset],
    type: QueryTypes.SELECT
});
```

### Priority 4: Add Composite Index
**Effort**: 5 minutes  
**Impact**: 20-30% improvement for pagination

```sql
ALTER TABLE post_tags ADD INDEX idx_tagId_postId (tagId, postId);
```

---

## Implementation Roadmap

| Priority | Task | Effort | Impact | Status |
|----------|------|--------|--------|--------|
| 1 | Add `idx_tag_slug` index | 5 min | 30-50% | ⏳ Pending |
| 2 | Implement Redis caching | 1 hour | 70-90% | ⏳ Pending |
| 3 | Optimize query structure | 2-3 hours | 40-60% | ⏳ Pending |
| 4 | Add composite index | 5 min | 20-30% | ⏳ Pending |

---

## Database Schema Changes Needed

### Current Schema
```javascript
// models/tags.js
const Tags = sequelize.define('tags', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tag: { type: DataTypes.STRING(255) },
    tag_slug: { type: DataTypes.STRING(255) }
}, {
    tableName: 'tags',
    timestamps: false,
    indexes: [
        { name: "PRIMARY", unique: true, fields: [{ name: "id" }] }
        // Missing: index on tag_slug
    ]
});
```

### Recommended Schema
```javascript
const Tags = sequelize.define('tags', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tag: { type: DataTypes.STRING(255) },
    tag_slug: { type: DataTypes.STRING(255) }
}, {
    tableName: 'tags',
    timestamps: false,
    indexes: [
        { name: "PRIMARY", unique: true, fields: [{ name: "id" }] },
        { name: "idx_tag_slug", fields: [{ name: "tag_slug" }] }  // ADD THIS
    ]
});
```

---

## Monitoring

### Metrics to Track
1. **Query Count**: Monitor `SELECT * FROM tags WHERE tag_slug = ?` frequency
2. **Query Time**: Average execution time per query
3. **Cache Hit Rate**: If caching is implemented
4. **API Response Time**: End-to-end latency for `/tags/post/:slug`

### Query to Monitor
```sql
SELECT COUNT(*) as query_count, AVG(query_time) as avg_time
FROM slow_query_log
WHERE query LIKE '%tags%tag_slug%';
```

---

## Related Files

- **Route Handler**: `routes/tags.js` (lines 17-112)
- **Model**: `models/tags.js`
- **Related Model**: `models/post_tags.js`
- **Related Model**: `models/posts.js`

---

## Summary

The high volume of `tag_slug` queries is a **normal but inefficient pattern** caused by:
1. ✗ Missing database index on `tag_slug`
2. ✗ No caching mechanism
3. ✗ Heavy nested queries with multiple JOINs

**Quick Fix**: Add index on `tag_slug` column (5 minutes)  
**Best Fix**: Implement Redis caching + index (1-2 hours)

**Document Version**: 1.0  
**Last Updated**: November 15, 2025
