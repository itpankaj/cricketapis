const express = require('express');
const router = express.Router();
const SpinPrizes = require('../models/spin_prizes');
const SpinQuestions = require('../models/spin_questions');
const SpinEntries = require('../models/spin_entries');
const sequelize = require('../connection/connection');

/**
 * GET /spin-win/config
 * Returns wheel configuration (prizes + random questions) for the frontend
 * No auth required - public endpoint
 */
router.get('/config', async (req, res) => {
    try {
        // Get settings
        const settingsRows = await sequelize.query(
            "SELECT setting_key, setting_value FROM spin_settings",
            { type: sequelize.QueryTypes.SELECT }
        );
        const settings = {};
        settingsRows.forEach(row => {
            settings[row.setting_key] = row.setting_value;
        });

        // Check if enabled
        if (settings.is_enabled !== '1') {
            return res.status(200).json({
                success: false,
                message: 'Spin & Win is currently disabled',
                enabled: false
            });
        }

        // Get active prizes (wheel segments)
        const prizes = await SpinPrizes.findAll({
            where: { is_active: 1 },
            attributes: ['id', 'label', 'color', 'text_color', 'sort_order'],
            order: [['sort_order', 'ASC']]
        });

        // Get random questions
        const questionsCount = parseInt(settings.questions_count) || 3;
        const questions = await SpinQuestions.findAll({
            where: { is_active: 1 },
            attributes: ['id', 'question', 'option_a', 'option_b', 'option_c', 'option_d'],
            order: sequelize.random(),
            limit: questionsCount
        });

        return res.status(200).json({
            success: true,
            enabled: true,
            settings: {
                title: settings.title || 'Spin & Win',
                subtitle: settings.subtitle || '',
                questions_count: questionsCount,
                min_correct: parseInt(settings.min_correct_to_qualify) || 2,
                cooldown_hours: parseInt(settings.cooldown_hours) || 24,
                max_spins_per_email: parseInt(settings.max_spins_per_email) || 1
            },
            prizes: prizes.map(p => ({
                id: p.id,
                label: p.label,
                color: p.color,
                textColor: p.text_color,
                sortOrder: p.sort_order
            })),
            questions: questions.map(q => ({
                id: q.id,
                question: q.question,
                options: [
                    { key: 'a', text: q.option_a },
                    { key: 'b', text: q.option_b },
                    { key: 'c', text: q.option_c },
                    { key: 'd', text: q.option_d }
                ]
            }))
        });

    } catch (error) {
        console.error('Spin config error:', error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * POST /spin-win/play
 * Submit a spin entry: spin result + quiz answers + user info
 * 
 * Body: {
 *   name: string,
 *   email: string,
 *   answers: [{ question_id: number, selected: 'a'|'b'|'c'|'d' }]
 * }
 * 
 * Response includes the prize won (server-side weighted random)
 */
router.post('/play', async (req, res) => {
    try {
        const { name, email, answers } = req.body;

        // Validate required fields
        if (!name || !name.trim()) {
            return res.status(400).json({ success: false, message: 'Name is required' });
        }
        if (!email || !email.trim()) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ success: false, message: 'Answers are required' });
        }

        // Get settings
        const settingsRows = await sequelize.query(
            "SELECT setting_key, setting_value FROM spin_settings",
            { type: sequelize.QueryTypes.SELECT }
        );
        const settings = {};
        settingsRows.forEach(row => {
            settings[row.setting_key] = row.setting_value;
        });

        if (settings.is_enabled !== '1') {
            return res.status(400).json({ success: false, message: 'Spin & Win is currently disabled' });
        }

        // Check cooldown
        const cooldownHours = parseInt(settings.cooldown_hours) || 24;
        const maxSpins = parseInt(settings.max_spins_per_email) || 1;

        if (maxSpins > 0) {
            // Check total lifetime spins
            const totalSpins = await SpinEntries.count({
                where: { email: email.trim().toLowerCase() }
            });
            if (totalSpins >= maxSpins) {
                return res.status(400).json({
                    success: false,
                    message: 'You have already used all your spins. Thank you for playing!'
                });
            }
        }

        if (cooldownHours > 0) {
            const since = new Date(Date.now() - cooldownHours * 60 * 60 * 1000);
            const recentCount = await SpinEntries.count({
                where: {
                    email: email.trim().toLowerCase(),
                    created_at: { [require('sequelize').Op.gte]: since }
                }
            });
            if (recentCount > 0) {
                return res.status(400).json({
                    success: false,
                    message: `Please wait ${cooldownHours} hours before playing again`
                });
            }
        }

        // Verify answers and calculate score
        const questionIds = answers.map(a => a.question_id);
        const dbQuestions = await SpinQuestions.findAll({
            where: { id: questionIds },
            attributes: ['id', 'correct_option']
        });

        const correctMap = {};
        dbQuestions.forEach(q => {
            correctMap[q.id] = q.correct_option;
        });

        let correctCount = 0;
        const answerDetails = [];
        answers.forEach(a => {
            const isCorrect = correctMap[a.question_id] === a.selected;
            if (isCorrect) correctCount++;
            answerDetails.push({
                question_id: a.question_id,
                selected: a.selected,
                correct: correctMap[a.question_id],
                is_correct: isCorrect
            });
        });

        const minCorrect = parseInt(settings.min_correct_to_qualify) || 2;
        const qualified = correctCount >= minCorrect;

        // Select prize using weighted random (server-side)
        const activePrizes = await SpinPrizes.findAll({
            where: { is_active: 1 },
            order: [['sort_order', 'ASC']]
        });

        let selectedPrize = null;
        if (activePrizes.length > 0) {
            // Filter out prizes that hit max_winners
            const available = activePrizes.filter(p =>
                p.max_winners <= 0 || p.current_winners < p.max_winners
            );
            const pool = available.length > 0 ? available : activePrizes;

            // Weighted random
            const totalWeight = pool.reduce((sum, p) => sum + parseFloat(p.probability), 0);
            let rand = Math.random() * totalWeight;
            for (const prize of pool) {
                rand -= parseFloat(prize.probability);
                if (rand <= 0) {
                    selectedPrize = prize;
                    break;
                }
            }
            if (!selectedPrize) selectedPrize = pool[pool.length - 1];
        }

        // Save entry
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';

        const entry = await SpinEntries.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            prize_id: selectedPrize ? selectedPrize.id : null,
            prize_label: selectedPrize ? selectedPrize.label : null,
            questions_asked: JSON.stringify(questionIds),
            answers_given: JSON.stringify(answerDetails),
            correct_count: correctCount,
            total_questions: answers.length,
            qualified: qualified ? 1 : 0,
            ip_address: ip.split(',')[0].trim(),
            user_agent: userAgent.substring(0, 500),
            created_at: new Date()
        });

        // Increment winner count if qualified
        if (qualified && selectedPrize) {
            await sequelize.query(
                "UPDATE spin_prizes SET current_winners = current_winners + 1 WHERE id = ?",
                { replacements: [selectedPrize.id] }
            );
        }

        // Find the index of the selected prize in the active prizes list (for wheel animation)
        let prizeIndex = 0;
        if (selectedPrize) {
            prizeIndex = activePrizes.findIndex(p => p.id === selectedPrize.id);
            if (prizeIndex < 0) prizeIndex = 0;
        }

        return res.status(200).json({
            success: true,
            entry_id: entry.id,
            prize: selectedPrize ? {
                id: selectedPrize.id,
                label: selectedPrize.label,
                color: selectedPrize.color,
                textColor: selectedPrize.text_color,
                type: selectedPrize.prize_type,
                index: prizeIndex
            } : null,
            quiz: {
                correct_count: correctCount,
                total: answers.length,
                qualified: qualified,
                min_required: minCorrect,
                details: answerDetails
            },
            message: qualified
                ? `Congratulations! You answered ${correctCount}/${answers.length} correctly and won "${selectedPrize?.label || 'a prize'}"!`
                : `You answered ${correctCount}/${answers.length} correctly. You needed ${minCorrect} to qualify. Better luck next time!`
        });

    } catch (error) {
        console.error('Spin play error:', error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * POST /spin-win/check-eligibility
 * Check if an email can play (cooldown + max spins check)
 * Body: { email: string }
 */
router.post('/check-eligibility', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, eligible: false, message: 'Email required' });
        }

        const settingsRows = await sequelize.query(
            "SELECT setting_key, setting_value FROM spin_settings",
            { type: sequelize.QueryTypes.SELECT }
        );
        const settings = {};
        settingsRows.forEach(row => {
            settings[row.setting_key] = row.setting_value;
        });

        const maxSpins = parseInt(settings.max_spins_per_email) || 1;
        const cooldownHours = parseInt(settings.cooldown_hours) || 24;
        const cleanEmail = email.trim().toLowerCase();

        if (maxSpins > 0) {
            const totalSpins = await SpinEntries.count({ where: { email: cleanEmail } });
            if (totalSpins >= maxSpins) {
                return res.status(200).json({
                    success: true,
                    eligible: false,
                    message: 'You have already used all your spins'
                });
            }
        }

        if (cooldownHours > 0) {
            const since = new Date(Date.now() - cooldownHours * 60 * 60 * 1000);
            const recentCount = await SpinEntries.count({
                where: {
                    email: cleanEmail,
                    created_at: { [require('sequelize').Op.gte]: since }
                }
            });
            if (recentCount > 0) {
                return res.status(200).json({
                    success: true,
                    eligible: false,
                    message: `Please wait ${cooldownHours} hours before playing again`
                });
            }
        }

        return res.status(200).json({ success: true, eligible: true });

    } catch (error) {
        console.error('Eligibility check error:', error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
