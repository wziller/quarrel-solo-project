const { Vote } = require("./models");

async function getVotes() {
  return await Vote.findAll();
}

async function create(voteDetails) {
  const vote = await Vote.create(voteDetails);
  return vote;
}

async function updateVote(id, updatedVote) {

    const vote =  await Vote.update({vote:updatedVote.vote},
        {
          where: {id:id},
          returning:true,
          plain: true
        }
      )
    return vote;
  }
  
  async function getUserVote(questionId, userId) {
    return await Vote.findAll({
      where:{
        user_id:userId,
        question_id:questionId
      }
    });
  }

async function deleteVote(id) {
  const vote = await Vote.findByPk(id)
  if(vote === null) return
  await vote.destroy();
  return vote;
}

module.exports = {
  getVotes,
  create,
  updateVote,
  deleteVote,
  getUserVote
};
