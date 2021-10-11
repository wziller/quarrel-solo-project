const {Vote} = require("./models");

async function getVotes() {
    return await Vote.findAll();
  }


  module.exports = {
      getVotes
  }
