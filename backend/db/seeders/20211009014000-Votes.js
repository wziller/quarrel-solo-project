"use strict";
const fakeUsers = require("./20211009011000-Users");
const fakeQuestions = require("./20211009013000-Questions");
const fakeVotes = [{
  vote: "user1",
  user_id: 1,
  question_id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
}];

fakeUsers.fakeUsers.forEach((user, idx) => {
  let userId = idx + 1;
  fakeQuestions.fakeQuestions.forEach((question, idx) => {
   let questionId = idx + 1
   const vote = Math.random() > 0.5 ? "user1" : "user2";
    let newvote = {
      vote: vote,
      user_id: userId,
      question_id: questionId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    fakeVotes.push(newvote);
  });
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Votes", fakeVotes, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Votes", null, {});
  },
};
