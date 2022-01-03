const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const questionsRouter = require('./questions.js')
const votesRouter = require('./votes.js')
const commentsRouter = require('./comments.js')
const updatesRouter = require('./updates.js')
const myquestionsRouter =require('./myquestions')
const categoriesRouter = require('./categories.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/questions', questionsRouter)

router.use('/votes', votesRouter)

router.use('/comments', commentsRouter)

router.use(`/categories`, categoriesRouter)

router.use('/myquestions', myquestionsRouter)

router.use('/updates', updatesRouter)

module.exports = router;
