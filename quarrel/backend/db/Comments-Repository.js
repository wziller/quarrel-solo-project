const {Comment} = require("./models");

async function list(id) {
    return await Comment.findAll({
        where:{
            question_id:id
        }
    });
  }

  module.exports = {
    list,
  };
