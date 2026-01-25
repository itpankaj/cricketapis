const express = require('express');
const router = express.Router();
const CricketSeries = require('../models/cricket_series');
const CricketSchedule = require('../models/cricket_schedule');
const CricketPointsTable = require('../models/cricket_points_table');
const CricketRankings = require('../models/cricket_rankings');
const CricketTeamsRankings = require('../models/cricket_teams_rankings');
const { Op } = require('sequelize');

/**
 * GET /cricket/series
 * Get all series with optional filters
 * Query params: year, format, type, limit, page
 */
router.get('/series', async (req, res) => {
    try {
        const { year, format, type, limit = 20, page = 1 } = req.query;
        const offset = (page - 1) * limit;

        const whereCondition = {};

        if (year) {
            whereCondition.year = year;
        }
        if (format) {
            whereCondition.format = format;
        }
        if (type) {
            whereCondition.type = type;
        }

        const { count, rows } = await CricketSeries.findAndCountAll({
            where: whereCondition,
            order: [
                ['year', 'DESC'],
                ['start_date', 'DESC']
            ],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        return res.status(200).json({
            success: true,
            data: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * GET /cricket/series/:series_id
 * Get single series by series_id
 */
router.get('/series/:series_id', async (req, res) => {
    try {
        const { series_id } = req.params;

        const series = await CricketSeries.findOne({
            where: { series_id: series_id }
        });

        if (!series) {
            return res.status(404).json({
                success: false,
                error: 'Series not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: series
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * GET /cricket/schedule
 * Get latest 20 matches (default) or filtered by series_id
 * Query params: series_id, status, limit, page
 */
router.get('/schedule', async (req, res) => {
    try {
        const { series_id, status, limit = 20, page = 1 } = req.query;
        const offset = (page - 1) * limit;

        const whereCondition = {};

        if (series_id) {
            whereCondition.series_id = series_id;
        }
        if (status) {
            whereCondition.status = status;
        }

        const { count, rows } = await CricketSchedule.findAndCountAll({
            where: whereCondition,
            order: [['match_date', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        // Get series names for each match
        const seriesIds = [...new Set(rows.map(r => r.series_id))];
        const seriesList = await CricketSeries.findAll({
            where: { series_id: { [Op.in]: seriesIds } },
            attributes: ['series_id', 'name', 'year', 'format']
        });

        const seriesMap = {};
        seriesList.forEach(s => {
            seriesMap[s.series_id] = {
                name: s.name,
                year: s.year,
                format: s.format
            };
        });

        // Add series info to each match
        const dataWithSeries = rows.map(match => {
            const matchData = match.toJSON();
            matchData.series = seriesMap[match.series_id] || null;
            return matchData;
        });

        return res.status(200).json({
            success: true,
            data: dataWithSeries,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * GET /cricket/schedule/latest
 * Get latest 20 upcoming/live matches
 * If no upcoming/live matches, returns latest matches by created_at
 */
router.get('/schedule/latest', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 20;

        // First try to get upcoming/live matches
        let matches = await CricketSchedule.findAll({
            where: {
                status: { [Op.in]: ['upcoming', 'live'] }
            },
            order: [
                ['match_date', 'ASC'],
                ['match_no', 'ASC'],
                ['id', 'ASC']
            ],
            limit: limit
        });

        // If no upcoming/live matches, get the most recent matches
        if (matches.length === 0) {
            matches = await CricketSchedule.findAll({
                order: [
                    ['match_date', 'DESC'],
                    ['match_no', 'DESC'],
                    ['id', 'DESC']
                ],
                limit: limit
            });
        }

        // Get series names
        const seriesIds = [...new Set(matches.map(r => r.series_id))];
        let seriesMap = {};
        
        if (seriesIds.length > 0) {
            const seriesList = await CricketSeries.findAll({
                where: { series_id: { [Op.in]: seriesIds } },
                attributes: ['series_id', 'name', 'year', 'format']
            });

            seriesList.forEach(s => {
                seriesMap[s.series_id] = {
                    name: s.name,
                    year: s.year,
                    format: s.format
                };
            });
        }

        const dataWithSeries = matches.map(match => {
            const matchData = match.toJSON();
            matchData.series = seriesMap[match.series_id] || null;
            return matchData;
        });

        return res.status(200).json({
            success: true,
            data: dataWithSeries,
            total: dataWithSeries.length
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * GET /cricket/schedule/series/:series_id
 * Get all matches for a specific series
 */
router.get('/schedule/series/:series_id', async (req, res) => {
    try {
        const { series_id } = req.params;

        // Get series info
        const series = await CricketSeries.findOne({
            where: { series_id: series_id }
        });

        if (!series) {
            return res.status(404).json({
                success: false,
                error: 'Series not found'
            });
        }

        const matches = await CricketSchedule.findAll({
            where: { series_id: series_id },
            order: [['match_date', 'ASC']]
        });

        return res.status(200).json({
            success: true,
            series: series,
            data: matches,
            total: matches.length
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * GET /cricket/points/:series_id
 * Get points table for a specific series
 */
router.get('/points/:series_id', async (req, res) => {
    try {
        const { series_id } = req.params;

        // Get series info
        const series = await CricketSeries.findOne({
            where: { series_id: series_id }
        });

        if (!series) {
            return res.status(404).json({
                success: false,
                error: 'Series not found'
            });
        }

        const pointsTable = await CricketPointsTable.findAll({
            where: { series_id: series_id },
            order: [
                ['points', 'DESC'],
                ['net_run_rate', 'DESC']
            ]
        });

        // Add position to each team
        const dataWithPosition = pointsTable.map((entry, index) => {
            const entryData = entry.toJSON();
            entryData.position = index + 1;
            return entryData;
        });

        return res.status(200).json({
            success: true,
            series: series,
            data: dataWithPosition,
            total: dataWithPosition.length
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * GET /cricket/match/:match_id
 * Get single match details
 */
router.get('/match/:match_id', async (req, res) => {
    try {
        const { match_id } = req.params;

        const match = await CricketSchedule.findOne({
            where: { match_id: match_id }
        });

        if (!match) {
            return res.status(404).json({
                success: false,
                error: 'Match not found'
            });
        }

        // Get series info
        const series = await CricketSeries.findOne({
            where: { series_id: match.series_id },
            attributes: ['series_id', 'name', 'year', 'format', 'type']
        });

        const matchData = match.toJSON();
        matchData.series = series;

        return res.status(200).json({
            success: true,
            data: matchData
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// ==================== RANKINGS ENDPOINTS ====================

/**
 * GET /cricket/rankings
 * Get all player rankings with optional filters
 * Query params: category, format, gender, ranking_type, limit, page
 */
router.get('/rankings', async (req, res) => {
    try {
        const { category, format, gender, ranking_type, limit = 50, page = 1 } = req.query;
        const offset = (page - 1) * limit;

        const whereCondition = {};

        if (category) {
            whereCondition.category = category;
        }
        if (format) {
            whereCondition.format = format;
        }
        if (gender) {
            whereCondition.gender = gender;
        }
        if (ranking_type) {
            whereCondition.ranking_type = ranking_type;
        }

        const { count, rows } = await CricketRankings.findAndCountAll({
            where: whereCondition,
            order: [
                ['category', 'ASC'],
                ['format', 'ASC'],
                ['position', 'ASC']
            ],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        return res.status(200).json({
            success: true,
            data: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * GET /cricket/rankings/:format
 * Get player rankings for a specific format (test, odi, t20)
 * Query params: category, gender, ranking_type, limit
 */
router.get('/rankings/:format', async (req, res) => {
    try {
        const { format } = req.params;
        const { category = 'batting', gender = 'men', ranking_type = 'icc', limit = 100 } = req.query;

        if (!['test', 'odi', 't20'].includes(format)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid format. Must be test, odi, or t20'
            });
        }

        const whereCondition = {
            format: format,
            category: category,
            gender: gender,
            ranking_type: ranking_type
        };

        const rankings = await CricketRankings.findAll({
            where: whereCondition,
            order: [['position', 'ASC']],
            limit: parseInt(limit)
        });

        return res.status(200).json({
            success: true,
            format: format.toUpperCase(),
            category: category,
            gender: gender,
            ranking_type: ranking_type,
            data: rankings,
            total: rankings.length
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * GET /cricket/rankings/player/:player_name
 * Search rankings by player name
 */
router.get('/rankings/player/:player_name', async (req, res) => {
    try {
        const { player_name } = req.params;

        const rankings = await CricketRankings.findAll({
            where: {
                player_name: { [Op.like]: `%${player_name}%` }
            },
            order: [
                ['category', 'ASC'],
                ['format', 'ASC'],
                ['position', 'ASC']
            ]
        });

        return res.status(200).json({
            success: true,
            data: rankings,
            total: rankings.length
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// ==================== TEAMS RANKINGS ENDPOINTS ====================

/**
 * GET /cricket/teams-rankings
 * Get all team rankings with optional filters
 * Query params: format, gender, ranking_type, limit, page
 */
router.get('/teams-rankings', async (req, res) => {
    try {
        const { format, gender, ranking_type, limit = 50, page = 1 } = req.query;
        const offset = (page - 1) * limit;

        const whereCondition = {};

        if (format) {
            whereCondition.format = format;
        }
        if (gender) {
            whereCondition.gender = gender;
        }
        if (ranking_type) {
            whereCondition.ranking_type = ranking_type;
        }

        const { count, rows } = await CricketTeamsRankings.findAndCountAll({
            where: whereCondition,
            order: [
                ['format', 'ASC'],
                ['position', 'ASC']
            ],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        return res.status(200).json({
            success: true,
            data: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * GET /cricket/teams-rankings/:format
 * Get team rankings for a specific format (test, odi, t20)
 * Query params: gender, ranking_type, limit
 */
router.get('/teams-rankings/:format', async (req, res) => {
    try {
        const { format } = req.params;
        const { gender = 'men', ranking_type = 'icc', limit = 50 } = req.query;

        if (!['test', 'odi', 't20'].includes(format)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid format. Must be test, odi, or t20'
            });
        }

        const whereCondition = {
            format: format,
            gender: gender,
            ranking_type: ranking_type
        };

        const rankings = await CricketTeamsRankings.findAll({
            where: whereCondition,
            order: [['position', 'ASC']],
            limit: parseInt(limit)
        });

        return res.status(200).json({
            success: true,
            format: format.toUpperCase(),
            gender: gender,
            ranking_type: ranking_type,
            data: rankings,
            total: rankings.length
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * GET /cricket/teams-rankings/team/:team_name
 * Search team rankings by team name
 */
router.get('/teams-rankings/team/:team_name', async (req, res) => {
    try {
        const { team_name } = req.params;

        const rankings = await CricketTeamsRankings.findAll({
            where: {
                team_name: { [Op.like]: `%${team_name}%` }
            },
            order: [
                ['format', 'ASC'],
                ['position', 'ASC']
            ]
        });

        return res.status(200).json({
            success: true,
            data: rankings,
            total: rankings.length
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = router;
