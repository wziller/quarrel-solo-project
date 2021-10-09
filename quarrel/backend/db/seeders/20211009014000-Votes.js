"use strict";
const fakeUsers = require("./20211009011000-Users");
const fakeQuestions = require("./20211009013000-Questions");
const fakeVotes = [{
  user1_vote: true,
  user2_vote: false,
  user_id: 1,
  question_id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
}];

fakeUsers.fakeUsers.forEach((user, idx) => {
  let userId = idx + 1;
  fakeQuestions.fakeQuestions.forEach((question, idx) => {
   let questionId = idx + 1
   const vote1 = Math.random() > 0.5 ? true : false;
    let newvote = {
      user1_vote: vote1,
      user2_vote: vote1 === true ? false : true,
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
