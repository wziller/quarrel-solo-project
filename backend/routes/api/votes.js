const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const VotesRepository = require("../../db/Votes-Repository");

const questionValidations = require("../../validations/questions");

const router = express.Router();
router.get(
    "/",
    asyncHandler(async function (req, res) {
      const votes = await VotesRepository.getVotes();
      return await res.json(votes);
    })
  );

  router.post(
    '/',
    // questionValidations.validateQuestion,
    asyncHandler(async function (req, res) {

      const newVote = await VotesRepository.create(req.body);
      return newVote;
    })
  );


  router.get(
    "/question/:questionId/user/:userId",
    asyncHandler(async function (req, res) {
      const {questionId} = req.params;
      const {userId} = req.params;
      const vote = await VotesRepository.getUserVote(questionId, userId);
      return await res.json(vote);
    })
  );
  router.put(
    "/:id",
    asyncHandler(async function (req, res) {
      let {id} = req.params
      let update = req.body
      const vote = await VotesRepository.updateVote(id, update);
      return await res.json(vote);
    })
  );

  router.delete(
    "/:id",
    asyncHandler(async function (req, res) {

      let {id} = req.params
      const vote = await VotesRepository.deleteVote(id);

      return await res.json(id);
    })
  );

  module.exports = router;