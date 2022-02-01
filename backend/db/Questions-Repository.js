const { Category } = require("./models");
const { Question } = require("./models");
const { Vote } = require("./models");
const { User } = require("./models");

async function create(questionDetails) {
  const question = await Question.create(questionDetails);
  return question;
}

async function list(userId) {
  let newQuestions = [];
  let questions = await Question.findAll({
    order: [["createdAt", "DESC"]],
    raw: true,
  });
  let users = await User.findAll();
  let votes = await Vote.findAll();
  questions.forEach(async (question) => {
    question.upVotes = "test";
    let userName1 = users.find((user) => user.id === question.user1_id);
    let userName2 = users.find((user) => user.id === question.user2_id);
    let total1 = question.user1_upvotes;
    let total2 = question.user2_upvotes;
    let currentUserVote = votes.find((vote) => {
      return vote.user_id == Number(userId) && vote.question_id == question.id;
    });

    let userVote = currentUserVote ? currentUserVote.vote : null;

    let userVoteId = currentUserVote ? currentUserVote.id : null;
    question.upVotes = {
      userName1: userName1.username,
      userName2: userName2.username,
      total1,
      total2,
      userVote,
      userVoteId,
    };
    newQuestions.push(question);
  });

  return newQuestions;
}

async function getQuestion(questionId, userId) {
  let users = await User.findAll();
  let votes = await Vote.findAll();
  const question = await Question.findByPk(questionId);
  let userName1 = users.find((user) => user.id === question.user1_id);
  let userName2 = users.find((user) => user.id === question.user2_id);
  let total1 = question.user1_upvotes;
  let total2 = question.user2_upvotes;
  let currentUserVote = votes.find((vote) => {
    return vote.user_id == Number(userId) && vote.question_id == question.id;
  });
  
  let userVote = currentUserVote ? currentUserVote.vote : null;

  let userVoteId = currentUserVote ? currentUserVote.id : null;

  question.upVotes = {
    userName1: userName1.username,
    userName2: userName2.username,
    total1,
    total2,
    userVote,
    userVoteId,
  };
  return question;
}

async function getQuestionByCategory(id) {
  return await Question.findAll({
    where: {
      category_id: id,
    },
  });
}

async function deleteQuestion(id) {
  const question = await Question.findByPk(id);
  question.destroy();
}

async function updateUser2Response(id, update) {
  const { arg } = update;
  const question = await Question.update(
    { user2_response: arg },
    {
      where: { id },
      returning: true,
      plain: true,
    }
  );
  return question;
}

async function getOneUserCompletedQuestions(id) {
  const U1Questions = await Question.findAll({
    where: {
      user1_id: id,
      complete: true,
    },
  });
  const U2Questions = await Question.findAll({
    where: {
      user2_id: id,
      complete: true,
    },
  });

  const Questions = [...U1Questions, ...U2Questions];
  return Questions;
}

async function getOneUserActiveQuestions(id) {
  const U1Questions = await Question.findAll({
    where: {
      user1_id: id,
      complete: false,
    },
  });
  const U2Questions = await Question.findAll({
    where: {
      user2_id: id,
      complete: false,
    },
  });
  const Questions = [...U1Questions, ...U2Questions];
  return Questions;
}

async function getOneUserPendingQuestions(id) {
  return await Question.findAll({
    where: {
      user2_id: id,
      user2_response: "",
      complete: false,
    },
  });
}

async function categories() {
  return await Category.findAll();
}

async function category(id) {
  return await Question.findAll({
    where: {
      category_id: id,
    },
  });
}

module.exports = {
  // getUpvotes,
  list,
  categories,
  category,
  getQuestion,
  create,
  getOneUserCompletedQuestions,
  getOneUserActiveQuestions,
  getOneUserPendingQuestions,
  deleteQuestion,
  updateUser2Response,
  getQuestionByCategory,
};
