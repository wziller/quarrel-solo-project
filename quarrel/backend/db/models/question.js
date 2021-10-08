'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question_name: DataTypes.STRING,
    user1_id: DataTypes.INTEGER,
    user2_id: DataTypes.INTEGER,
    question: DataTypes.STRING,
    user1_response: DataTypes.TEXT,
    user2_response: DataTypes.TEXT,
    user1_upvotes: DataTypes.INTEGER,
    user2_upvotes: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    deadline: DataTypes.DATE,
    complete: DataTypes.BOOLEAN
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
  };
  return Question;
};