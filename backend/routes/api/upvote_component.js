const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const UpvoteRepository = require("../../db/Upvotes-Repository");

const router = express.Router();

router.get(
    `/question/:questionId/user/:userId`,
    asyncHandler(async function (req, res) {
        let {questionId} = req.params
        let {userId} = req.params
        const upVotesData = await UpvoteRepository.getUpvotes(questionId, userId);
        return await res.json(upVotesData);
    })
  );

  module.exports = router
