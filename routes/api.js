const express = require('express');
const router = express.Router();

const questionRouter = require('./api/question');
const podcastRouter = require('./api/podcast');
const userRouter = require('./api/user');
const newsRouter = require('./api/news');

router.use('/question', questionRouter);
router.use('/podcast', podcastRouter);
router.use('/news', newsRouter);
router.use('/user', userRouter);

module.exports = router;
