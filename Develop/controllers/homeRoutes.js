// Imports
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Routes
router.get("/", async (req, res) => {
    try {
        // Get all posts and JOIN with user data and comment data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                    attributes: [ "comment_body"],
                },
            ],
        });
        // Serialize data so the template can read it
        const post = postData.map((post) =>
        post.get({ plain: true})
        );
        // Pass serialized data and session flag into template
        res.render("homepage", {
            post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});