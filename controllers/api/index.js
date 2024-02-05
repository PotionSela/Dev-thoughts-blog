// Imports
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Middleware
router.use('/userRoutes', userRoutes);
router.use('/postRoutes', postRoutes);
router.use('/comment', commentRoutes);

// Exports
module.exports = router;