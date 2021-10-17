const { Vote } = require("./models");

async function getVotes() {
  return await Vote.findAll();
}

async function create(voteDetails) {
  const vote = await Vote.create(voteDetails);
  return vote.id;
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

async function deleteVote(id) {
  const vote = await Vote.findByPk(id)
  vote.destroy();
}

module.exports = {
  getVotes,
  create,
  updateVote,
  deleteVote,
};
