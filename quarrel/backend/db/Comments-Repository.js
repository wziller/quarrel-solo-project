const {Comment} = require("./models");

async function list(id) {
    return await Comment.findAll({
        where:{
            question_id:id
        }
    });
  }

  async function create(commentDetails) {
    const comment = await Comment.create(commentDetails);
    return comment.id;
  }

  async function deleteQuestion(id) {
    const question =  await Comment.findAll({
      where:{
        id:id
      }
    });
    question[0].destroy()
  }

  module.exports = {
    list,
    create,
    deleteQuestion
  };
