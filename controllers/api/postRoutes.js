// Imports
const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a new blog post
router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

// A route to edit an existing post
router.put("/:id", withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: "There's no blog post found with this id!" });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// A route to delete an existing post
router.delete("/:id", withAuth, async (req, res) => {
    console.log(req.params.id);
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: "No post found with that id!" });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Exports
module.exports = router;