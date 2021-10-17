const {User} = require("./models");

async function getUsers() {
    return await User.findAll();
  }


  module.exports = {
      getUsers
  }
