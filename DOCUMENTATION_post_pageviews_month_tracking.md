# post_pageviews_month Table - Database Operations Documentation

**Date**: November 15, 2025  
**Purpose**: Document all INSERT and SELECT operations on the `post_pageviews_month` table  
**Status**: All operations have been commented for tracking and maintenance

---

## Table Overview

| Property | Value |
|----------|-------|
| **Table Name** | `post_pageviews_month` |
| **Model File** | `/models/post_pageviews_month.js` |
| **Purpose** | Tracks monthly page views for posts with reward tracking |
| **Primary Key** | `id` (auto-increment) |

---

## Table Schema

```sql
CREATE TABLE post_pageviews_month (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT,
  post_user_id INT,
  ip_address VARCHAR(45),
  user_agent VARCHAR(255),
  reward_amount DOUBLE DEFAULT 0,
  created_at DATETIME
);
```

### Indexes
- `PRIMARY` on `id`
- `idx_post_id` on `post_id`
- `idx_created_at` on `created_at`
- `idx_post_user_id` on `post_user_id`

---

## All Database Operations

### 1. INSERT Operations

#### Operation 1: Record Post Pageview
- **File**: `routes/posts.js`
- **Line**: 480
- **API Endpoint**: `GET /posts/:slug`
- **Trigger**: When a user accesses a post article
- **Code**:
```javascript
// [INSERT] post_pageviews_month - Records a new pageview when user accesses a post via GET /posts/:slug
await PostPageViewMonth.create({
    post_id: data.id,
});
```
- **Description**: Creates a new record in `post_pageviews_month` table every time someone views a post
- **Fields Populated**: 
  - `post_id`: ID of the post being viewed
  - `created_at`: Automatically set to current timestamp

---

### 2. SELECT Operations

#### Operation 1: Count Post Pageviews
- **File**: `routes/posts.js`
- **Line**: 486
- **API Endpoint**: `GET /posts/:slug`
- **Trigger**: After recording a pageview
- **Code**:
```javascript
// [SELECT] post_pageviews_month - Counts total pageviews for the post to return view count
const count = await PostPageViewMonth.count({
    where: {
        post_id: data.id
    }
});
```
- **Description**: Counts total number of pageviews for a specific post
- **Where Clause**: Filters by `post_id` to get views for the current post
- **Return Value**: Integer count of total pageviews

---

## Model Relationships

**File**: `models/posts.js` (Line 320)

```javascript
Posts.hasMany(PostPageViewMonth, { foreignKey: 'post_id' });
```

- **Relationship Type**: One-to-Many
- **Meaning**: Each post can have multiple pageview records

---

## API Endpoints Summary

| Endpoint | Method | File | Operations | Purpose |
|----------|--------|------|-----------|---------|
| `/posts/:slug` | GET | `routes/posts.js` | INSERT + SELECT | Fetch post details and track pageview |
| `/tags/post/:slug` | GET | `routes/tags.js` | None (imports only) | Fetch posts by tag (no pageview tracking) |

---

## Important Notes

1. **Active Usage**: Only the `GET /posts/:slug` endpoint actively uses this table
2. **Unused Import**: `routes/tags.js` imports `PostPageViewMonth` but does not use it
3. **Every View Tracked**: A new record is created for EVERY single pageview
4. **Performance Consideration**: With high traffic, this table can grow rapidly
5. **Reward Tracking**: The `reward_amount` field is available for monetization features

---

## Changes Made

### Commenting Update (Nov 15, 2025)
- Added `[INSERT]` comment marker to line 479 in `routes/posts.js`
- Added `[SELECT]` comment marker to line 485 in `routes/posts.js`
- These comments help developers quickly identify database operations when reviewing code

---

## Future Optimization Opportunities

1. **Batch Inserts**: Consider batching pageview records if traffic is very high
2. **Archival Strategy**: Implement monthly archival of old pageview data
3. **Caching**: Cache pageview counts to reduce SELECT queries
4. **IP Tracking**: Currently `ip_address` and `user_agent` fields are not being populated - consider adding if needed
5. **Duplicate Prevention**: Add logic to prevent duplicate pageviews from same IP within short time window

---

## Related Files

- Model Definition: `models/post_pageviews_month.js`
- Model Relationships: `models/posts.js`
- Primary Usage: `routes/posts.js`
- Secondary Import: `routes/tags.js`
- Model Initialization: `models/init-models.js`

---

**Document Version**: 1.0  
**Last Updated**: November 15, 2025
