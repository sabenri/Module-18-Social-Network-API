const router = require('express').Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

router.use((req, res) => {
    return res.status(404).json({ message:"Wrong Route. Try Again."})
});

module.exports = router;