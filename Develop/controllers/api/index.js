const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/userRoutes', userRoutes);
router.use('/projects', projectRoutes);

module.exports = router;