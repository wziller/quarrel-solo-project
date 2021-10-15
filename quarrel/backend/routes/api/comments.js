const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { route } = require(".");

const CommentsRepository = require("../../db/Comments-Repository");

const commentValidations = require("../../validations/questions");

const router = express.Router();

router.get(
  "/:id",
  asyncHandler(async function (_req, res) {
    const { id } = _req.params;
    const comments = await CommentsRepository.list(id);
    return res.json(comments);
  })
);

router.delete(
  "/:id",
  asyncHandler(async function (req, res) {

    let {id} = req.params
    const comment = await CommentsRepository.deleteQuestion(id);
    return await res.json(comment);
  })
);

router.post(
  '/',
  // questionValidations.validateQuestion,
  asyncHandler(async function (req, res) {

    const newComment = await CommentsRepository.create(req.body);
    return newComment;
  })
);

module.exports = router;
