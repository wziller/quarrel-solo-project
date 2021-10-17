'use strict';
const fakeQuestions =require("./20211009013000-Questions")
const fakeUsers = require("./20211009011000-Users")
const faker = require('faker')

const fakeComments = []
  fakeUsers.fakeUsers.forEach((user, idx)=>{
    let userId = idx + 1
    fakeQuestions.fakeQuestions.forEach((question, idx) =>{
      let questionId = idx + 1
      fakeComments.push({
        user_id:userId,
        body:faker.lorem.paragraph(),
        question_id:questionId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
  })


module.exports = {
  fakeComments,
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', fakeComments, {});
},

down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
}
};
