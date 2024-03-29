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
        const posts = postData.map((post) =>
            post.get({ plain: true})
        );
        // Pass serialized data and session flag into template
        res.render("homepage", {
            posts,
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

// Route for logged in user to access to the dashboard page
// Use withAuth Middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        // Find the logged in user based on session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            // Join user blog post and comment data with user data
            include: [
                {
                    model: Post,
                    include: [User],
                },
                {
                    model: Comment,
                },
            ],
        });
        const user = userData.get({ plain: true });
        console.log(user)
        res.render("dashboard", {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// For new post = renders 'create.handlebars' and redirects to /login if not logged in
router.get("/create", async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.render("create", {
                logged_in: req.session.logged_in,
                userId: req.session.user_id,
            });
            return;
        } else {
            res.redirect("/login");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to set up to be able to edit an existing post
router.get("/create/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            // Join the user data and comment data with the post data
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

        if (req.session.logged_in) {
            res.render("edit", {
                ...post,
                logged_in: req.session.logged_in,
                userId: req.session.user_id,
            });
            return;
        } else {
            res.redirect("/login");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.all("/login", (req, res) => {
    // If user is logged in already, redirect the request to another route
    if ( req.session.logged_in ) {
        res.redirect("/dashboard");
        return;
    }
    res.render("login");
});

// Export
module.exports = router;