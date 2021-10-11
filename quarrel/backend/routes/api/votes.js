const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const VotesRepository = require("../../db/Votes-Repository");

const questionValidations = require("../../validations/questions");

const router = express.Router();
router.get(
    "/",
    asyncHandler(async function (_req, res) {
      const votes = await VotesRepository.getVotes();
      return await res.json(votes);
    })
  );

  module.exports = router;
