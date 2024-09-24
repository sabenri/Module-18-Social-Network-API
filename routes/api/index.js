const router = require('express').Router();
const UserRoutes = require('./UserRoutes');
const ThoughtRoutes = require('./ThoughtRoutes');

router.use('./User', UserRoutes);

router.use('/thoughts', ThoughtRoutes);

module.exports = router;