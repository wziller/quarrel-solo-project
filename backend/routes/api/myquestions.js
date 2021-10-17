const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const QuestionRepository = require("../../db/Questions-Repository");

const questionValidations = require("../../validations/questions");

const router = express.Router();

router.get(
    `/user/:id/completed`,
    asyncHandler(async function (_req, res) {
      const {id} = _req.params;
      const questions = await QuestionRepository.getOneUserCompletedQuestions(id);
      return res.json(questions);
    })
  );

  router.get(
    `/user/:id/active`,
    asyncHandler(async function (_req, res) {
      const {id} = _req.params;
      const questions = await QuestionRepository.getOneUserActiveQuestions(id);
      return res.json(questions);
    })
  );

  router.get(
    `/user/:id/pending`,
    asyncHandler(async function (_req, res) {
      const {id} = _req.params;
      const questions = await QuestionRepository.getOneUserPendingQuestions(id);
      return res.json(questions);
    })
  );

  router.get(
    `/user/:id/pending`,
    asyncHandler(async function (_req, res) {
      const {id} = _req.params;
      const questions = await QuestionRepository.getOneUserQuestions(id);
      return res.json(questions);
    })
  );



module.exports = router
