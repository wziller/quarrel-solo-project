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

router.get(
  "/categories",
  asyncHandler(async function (_req, res) {
    const categories = await QuestionRepository.categories();
    return await res.json(categories);
  })
);

router.get(
  "/categories/:id",
  asyncHandler(async function (_req, res) {
    let {id} = _req.params
    console.log(id)
    const category = await QuestionRepository.category(id);
    return await res.json(category);
  })
);

router.get(
  "/votes/:id",
  asyncHandler(async function (_req, res) {
    let {id} = _req.params
    console.log(id)
    const category = await QuestionRepository.getVotes(id);
    return await res.json(category);
  })
);


module.exports = router
