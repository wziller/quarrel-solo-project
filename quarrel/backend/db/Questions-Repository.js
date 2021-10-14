const {Category} = require("./models");
const {Question} = require("./models");

async function create(questionDetails) {
  const question = await Question.create(questionDetails);
  return question.id;
}

async function list() {
    return await Question.findAll();
  }

  async function getQuestion(id) {
    return await Question.findAll({
      where:{
        id:id
      }
    });
  }
  async function deleteQuestion(id) {
    const question =  await Question.findAll({
      where:{
        id:id
      }
    });
    question[0].destroy()
  }

  async function updateUser2Response(id, update) {
    const question =  await Question.findAll({
      where:{
        id:id
      }
    });
    question.user_response = update;
  }

  async function getOneUserCompletedQuestions(id) {
    return await Question.findAll({
      where:{
        user1_id:id,
        complete:true
      }
    });
  }

  async function getOneUserActiveQuestions(id) {
      return await Question.findAll({
        where:{
          user1_id:id,
          complete:false
        }
      });
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
    updateUser2Response
  };
