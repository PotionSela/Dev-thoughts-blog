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

// Get a single post
router.get("/post/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            // Join user data and comment data with blog post data
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        const post = postData.get({ plain: true });
        console.log(post);
        res.render("post", {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
        res.redirect("/login");
    }
});
