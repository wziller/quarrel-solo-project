const {Category} = require("./models");
const {Question} = require("./models");
const {Vote} = require("./models");

async function list() {
    return await Question.findAll();
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

  async function getVotes(id) {
    return await Vote.findAll({
      where:{
        question_id:id,
      }
    });
  }

  module.exports = {
    list,
    categories,
    category,
    getVotes
  };
