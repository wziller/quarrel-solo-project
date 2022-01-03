const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const UpdatesRepository = require("../../db/Updates-Repository");

const questionValidations = require("../../validations/questions");

const router = express.Router();

router.put(
  "/updateTotals/",
  asyncHandler(async function (req, res) {
    const questions = await UpdatesRepository.updateQuestionTotal();
    return await res.json(questions);
  })
);


module.exports = router







module.exports = router
