const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const QuestionRepository = require("../../db/Questions-Repository");
const {categories} = require("../../db/Questions-Repository");

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
      console.log("hit======>")
    return await res.json({categories});
  })
);


module.exports = router
