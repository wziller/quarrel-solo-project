const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const QuestionRepository = require("../../db/Questions-Repository");

const questionValidations = require("../../validations/questions");

const router = express.Router();


router.get(
  "/",
  asyncHandler(async function (_req, res) {
    console.log(":api categories")
    const categories = await QuestionRepository.categories();
    return await res.json(categories);
  })
);

router.get(
  "/:id",
  asyncHandler(async function (_req, res) {
    let {id} = _req.params
    const category = await QuestionRepository.category(id);
    return await res.json(category);
  })
);

module.exports = router
