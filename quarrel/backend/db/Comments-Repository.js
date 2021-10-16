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
    const question =  await Comment.findAll({
      where:{
        id:id
      }
    });
    question[0].destroy()
  }

  async function updateResponse(id, update) {
    console.log(id)
    console.log(update)
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
