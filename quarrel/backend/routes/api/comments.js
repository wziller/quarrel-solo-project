const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { route } = require(".");

const CommentRepository = require("../../db/Comments-Repository");

const commentValidations = require("../../validations/questions");

const router = express.Router();

router.get(
  "/:id",
  asyncHandler(async function (_req, res) {
    const { id } = _req.params;
    const comments = await CommentRepository.list(id);
    return res.json(comments);
  })
);

module.exports = router;
