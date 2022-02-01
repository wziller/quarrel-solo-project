const { Category } = require("./models");
const { Question } = require("./models");
const { Vote } = require("./models");

async function updateQuestionTotal() {
  const votes = await Vote.findAll();
  const questions = await Question.findAll();
  questions.forEach(async (question) => {
    let user1Total = 0;
    let user2Total = 0;
    votes.forEach((vote) => {
      if (vote.question_id === question.id)
        vote.vote === "user1" ? (user1Total += 1) : (user2Total += 1);
    });
    await Question.update(
      { user1_upvotes: user1Total, user2_upvotes: user2Total },
      {
        where: { id: question.id },
        returning: true,
        plain: true,
        order: [["createdAt", "DESC"]],
      }
    );
  });
  return questions;
}

async function updateOneQuestionTotal(questionId) {
  const votes = await Vote.findAll();
  const question = await Question.findByPk(questionId);

  let user1Total = 0;
  let user2Total = 0;
  votes.forEach((vote) => {
    if (vote.question_id == questionId)
      vote.vote === "user1" ? (user1Total += 1) : (user2Total += 1);
  });

  await Question.update(
    { user1_upvotes: user1Total, user2_upvotes: user2Total },
    {
      where: { id: question.id },
      returning: true,
      plain: true,
      order: [["createdAt", "DESC"]],
    }
  );

  return question;
}

module.exports = {
  updateQuestionTotal,
  updateOneQuestionTotal,
};
