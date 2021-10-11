const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const questionsRouter = require('./questions.js')
const votesRouter = require('./votes.js')
const commentsRouter = require('./comments.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/questions', questionsRouter)

router.use('/votes', votesRouter)

router.use('/comments', commentsRouter)

module.exports = router;
