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
    const comment = await CommentsRepository.deleteComment(id);
    return await res.json(comment);
  })
);

router.post(
  '/',
  asyncHandler(async function (req, res) {

    const newComment = await CommentsRepository.create(req.body);
    return newComment;
  })
);

router.put(
  "/:id",
  asyncHandler(async function (req, res) {
    let {id} = req.params
    let update = req.body
    const comment = await CommentsRepository.updateResponse(id, update);
    return await res.json(comment);
  })
);

module.exports = router;
