const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const QuestionRepository = require("../../db/Questions-Repository");

const questionValidations = require("../../validations/questions");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async function (_req, res) {
    const questions = await QuestionRepository.list();
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
router.put(
  "/:id",
  asyncHandler(async function (req, res) {
    let {id} = req.params
    let update = req.body
    const question = await QuestionRepository.updateUser2Response(id, update);
    return await res.json(question);
  })
);





module.exports = router
