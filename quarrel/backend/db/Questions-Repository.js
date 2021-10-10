const { Question } = require("./models");
const { Category } = require("./models");

async function list() {
    return await Question.findAll();
  }

  async function categories() {
    let res = await Category.findAll();
    return res
  }


  module.exports = {
    list,
    categories
  };
