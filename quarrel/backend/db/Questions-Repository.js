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
    create
  };
