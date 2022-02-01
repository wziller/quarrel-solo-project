const {User} = require("./models");
const {Question} = require("./models")
const {Vote} =require("./models")
async function getUpvotes(questionId, userId) {

    let question =  await Question.findByPk(questionId);
    let userName1 = await User.findByPk(question.user1_id)
    let userName2 = await User.findByPk(question.user2_id)
    let total1 = question.user1_upvotes;
    let total2 = question.user2_upvotes;
    let currentUserVote= await Vote.findAll({
        where:{
            user_id:userId,
            question_id: question.id
        }
    });
    let userVote = currentUserVote.length === 0 ? null : currentUserVote[0].vote
    return {
        userName1:userName1.username,
        userName2:userName2.username,
        total1,
        total2,
        userVote,
    }


  }


  module.exports = {
    getUpvotes
  };
