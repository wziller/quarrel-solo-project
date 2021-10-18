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

  async function deleteComment(id) {
    const comment =  await Comment.findByPk(id);
    comment.destroy()
  }

  async function updateResponse(id, update) {

    const {body} = update
    const question =  await Comment.update({body},
        {
          where: {id},
          returning:true,
          plain: true
        }
      )
    return question;
  }

  module.exports = {
    list,
    create,
    deleteComment,
    updateResponse
  };
