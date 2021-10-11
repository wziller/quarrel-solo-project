const { check } = require("express-validator");
const { handleValidationErrors } = require("../utils/validation");

const id = check("id").notEmpty().isInt({ min: 0 });
const question_name = check("question_name").notEmpty().isString();
const question = check("question").notEmpty().isString();
const user2_id = check("user2_id").exists().notEmpty().isEmpty()
const user1_response = check("user1_response").notEmpty().isString();
const category_id = check("category_id").notEmpty();
const deadline = check("deadline").notEmpty();
exports.validateQuestion = [
  id,
  question_name,
  question,
  user2_id,
  user1_response,
  category_id,
  deadline,
  handleValidationErrors,
];

exports.validateUpdate = [
  id,
  question_name,
  question,
  user1_response,
  category_id,
  deadline,
  handleValidationErrors,
];
