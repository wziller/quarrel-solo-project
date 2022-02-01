const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const UpdatesRepository = require("../../db/Updates-Repository");


const VotesRepository = require("../../db/Votes-Repository");

const router = express.Router();
router.get(
    "/",
    asyncHandler(async function (req, res) {
      const votes = await VotesRepository.getVotes();
      return await res.json(votes);
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

  router.post(
    '/',
    // questionValidations.validateQuestion,
    asyncHandler(async function (req, res) {
      const newVote = await VotesRepository.create(req.body);
      await UpdatesRepository.updateOneQuestionTotal(newVote.question_id)
      return newVote.id;
    })
  );

  router.put(
    "/:id",
    asyncHandler(async function (req, res) {
      let {id} = req.params
      let update = req.body
      const vote = await VotesRepository.updateVote(id, update);
      console.log("vote=====================>",vote[1])
      await UpdatesRepository.updateOneQuestionTotal(vote[1].question_id)
      return await res.json(vote);
    })
  );

  router.delete(
    "/:id",
    asyncHandler(async function (req, res) {

      let {id} = req.params
      const vote = await VotesRepository.deleteVote(id);
      console.log(vote)
      await UpdatesRepository.updateOneQuestionTotal(vote.question_id)
      return vote;
    })
  );

  module.exports = router;
