const express = require("express");
const Subscribers = require("../models/subscribers");

const router = express.Router();

router.post("", async (req, res) => {
    try {
        const { email } = req.body;
        const newSubscriber = await Subscribers.create({ email, token: null });
        return res.status(201).json(newSubscriber);
    } catch (error) {
        console.error("Error creating subscriber:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to get all subscribers
router.get("/", async (req, res) => {
    try {
        const allSubscribers = await Subscribers.findAll();
        return res.status(200).json(allSubscribers);
    } catch (error) {
        console.error("Error fetching subscribers:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;