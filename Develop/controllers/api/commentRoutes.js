// Imports
const router = require("express").Router();
const { Post, Comment, User } = require("../../models");

// Create a comment
router.post("/", async (req, res) => {
    try {
        console.log("We have made it!");
        const comment = await Comment.create({
            comment_body: req.body.comment_body,
            post_id: req.body.post_id,
            user_id: req.session.user_id || req.body.user_id,
        });
        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});