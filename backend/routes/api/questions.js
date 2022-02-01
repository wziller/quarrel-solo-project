const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const QuestionRepository = require("../../db/Questions-Repository");

const questionValidations = require("../../validations/questions");

const router = express.Router();

router.get(
  "/all/:id",
  asyncHandler(async function (req, res) {
    let {id} = req.params
    let questions = await QuestionRepository.list(id);

  //   let newQuestions = await questions.map( async question => {
  //     let upvotes = await QuestionRepository.getUpvotes(question.id, id)
  //     question.upVotes = upvotes;
  //   })

    return res.json(questions);
  })
);

router.post(
  '/',
  questionValidations.validateQuestion,
  asyncHandler(async function (req, res) {

    const newQuestion = await QuestionRepository.create(req.body);
    return newQuestion;
  })
);

router.get(
  "/category/:id",
  asyncHandler(async function (_req, res) {
    let {id} = _req.params
    const questions = await QuestionRepository.getQuestionByCategory(id);
    return await res.json(questions);
  })
);

router.get(
  "/question/:questionId/user/:userId",
  asyncHandler(async function (req, res) {
    let {questionId} = req.params
    let {userId} = req.params
    const question = await QuestionRepository.getQuestion(questionId, userId);
    return await res.json(question);
  })
);

router.put(
  "/updateTotals/",
  asyncHandler(async function (req, res) {
    const questions = await QuestionRepository.updateQuestionTotal();
    return await res.json(questions);
  })
);

router.put(
  "/:id",
  asyncHandler(async function (_req, res) {
    let {id} = _req.params
    const question = await QuestionRepository.getQuestion(id);
    return await res.json(question);
  })
);

router.delete(
  "/:id",
  asyncHandler(async function (req, res) {

    let {id} = req.params
    const question = await QuestionRepository.deleteQuestion(id);
    return await res.json(question);
  })
);

module.exports = router
