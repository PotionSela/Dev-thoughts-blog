// Imports
const router = require("express").Router();
const { User } = require("../../models");


// Posts for new user, email, username, and password to database
router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login route for validating user credentials, and user logs in it checks if theres a match in the database
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            console.log("no user found! Try again please.");
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again!" });
                return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            console.log("No password match");
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again!" });
                return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: "You are logged in now!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});