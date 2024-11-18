const express = require("express");
const Subscribers = require("../models/subscribers");
const categories = require("../models/categories");
const posts = require("../models/posts");
const router = express.Router();

router.get("", async (req, res) => {
  try {
    // Fetch categories where `show_on_footer` is 1
    const footerCategories = await categories.findAll({
      where: { show_on_footer: 1 },
      attributes: ["id", "name", "name_slug"], // Adjust attributes based on your categories model
    });

    // Fetch posts where `is_footer` is 1
    const footerPosts = await posts.findAll({
      where: { is_footer: 1 },
      attributes: ["id", "title",'title_slug'], // Adjust attributes based on your posts model
    });

    // Combine both results into a single response
    return res.status(200).json({ footerCategories, footerPosts });
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;