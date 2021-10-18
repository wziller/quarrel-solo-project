const {Category} = require("./models");
const {Question} = require("./models");

async function create(questionDetails) {
  const question = await Question.create(questionDetails);
  return question;
}

async function list() {
    return await Question.findAll();
  }

  async function getQuestion(id) {
    return await Question.findByPk(id);
  }

  async function getQuestionByCategory(id) {
    return await Question.findAll({
      where:{
        category_id:id
      }
    });
  }

  async function deleteQuestion(id) {
    const question =  await Question.findByPk(id);
    question.destroy()
  }

  async function updateUser2Response(id, update) {
    const {arg} = update;
    const question =  await Question.update({user2_response:arg},
        {
          where: {id},
          returning:true,
          plain: true
        }
      )
    return question;
  }

  async function getOneUserCompletedQuestions(id) {

    const U1Questions = await Question.findAll({
      where:{
        user1_id:id,
        complete:true
      }
    });
    const U2Questions = await Question.findAll({
      where:{
        user2_id:id,
        complete:true
      }
    });

    const Questions = [...U1Questions,...U2Questions]
    return Questions
  }

  async function getOneUserActiveQuestions(id) {
      const U1Questions =  await Question.findAll({
        where:{
          user1_id:id,
          complete:false
        }
      });
      const U2Questions = await Question.findAll({
        where:{
          user2_id:id,
          complete:false
        }
      });
      const Questions = [...U1Questions, ...U2Questions]
      return Questions
  }

  async function getOneUserPendingQuestions(id) {
    return await Question.findAll({
      where:{
        user2_id:id,
        user2_response:'',
        complete:false
      }
    });
}

  async function categories() {
    return await Category.findAll();
  }

  async function category(id) {
    return await Question.findAll({
      where:{
        category_id:id
      }
    });
  }



  module.exports = {
    list,
    categories,
    category,
    getQuestion,
    create,
    getOneUserCompletedQuestions,
    getOneUserActiveQuestions,
    getOneUserPendingQuestions,
    deleteQuestion,
    updateUser2Response,
    getQuestionByCategory
  };
